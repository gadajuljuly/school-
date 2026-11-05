-- Password recovery without SMS or e-mail. Run once after schema.sql (SQL Editor → paste → Run).
-- 1) Each teacher keeps a personal recovery code; with it she can set a new password herself.
-- 2) The administrator can set a temporary password for any teacher.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.tala_recovery (
  email      text primary key,
  code_hash  text not null,
  failures   int not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.tala_recovery enable row level security;   -- no policies: reachable only through the functions below
revoke all on public.tala_recovery from anon, authenticated;

-- Signed-in teacher saves (or replaces) her recovery code.
create or replace function public.tala_set_recovery(p_code text) returns void
language plpgsql security definer set search_path = public, extensions as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if length(coalesce(p_code, '')) < 8 then raise exception 'code too short'; end if;
  insert into public.tala_recovery (email, code_hash, failures, updated_at)
  values (lower(auth.jwt() ->> 'email'), crypt(upper(p_code), gen_salt('bf')), 0, now())
  on conflict (email) do update set code_hash = excluded.code_hash, failures = 0, updated_at = now();
end $$;

-- Forgotten password: phone (as stored) + recovery code + new password. Locked after 5 wrong codes.
create or replace function public.tala_reset_with_code(p_email text, p_code text, p_password text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare r public.tala_recovery;
begin
  if length(coalesce(p_password, '')) < 6 then return 'weak'; end if;
  select * into r from public.tala_recovery where email = lower(p_email);
  if r.email is null then return 'no-code'; end if;
  if r.failures >= 5 then return 'locked'; end if;
  if r.code_hash <> crypt(upper(p_code), r.code_hash) then
    update public.tala_recovery set failures = failures + 1 where email = r.email;
    return 'wrong';
  end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where email = r.email;
  update public.tala_recovery set failures = 0 where email = r.email;
  return 'ok';
end $$;

-- Administrator: list of teachers, and setting a temporary password.
create or replace function public.tala_admin_users()
returns table (email text, name text, created_at timestamptz, last_sign_in_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.tala_is_admin() then raise exception 'not allowed'; end if;
  return query select u.email::text, (u.raw_user_meta_data ->> 'name')::text, u.created_at, u.last_sign_in_at
    from auth.users u order by 2 nulls last, 1;
end $$;

create or replace function public.tala_admin_set_password(p_email text, p_password text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public.tala_is_admin() then raise exception 'not allowed'; end if;
  if length(coalesce(p_password, '')) < 6 then raise exception 'weak'; end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where email = lower(p_email);
  if not found then return false; end if;
  update public.tala_recovery set failures = 0 where email = lower(p_email);
  return true;
end $$;

revoke execute on function public.tala_set_recovery(text), public.tala_reset_with_code(text, text, text),
  public.tala_admin_users(), public.tala_admin_set_password(text, text) from public;
grant execute on function public.tala_set_recovery(text) to authenticated;
grant execute on function public.tala_reset_with_code(text, text, text) to anon, authenticated;
grant execute on function public.tala_admin_users() to authenticated;
grant execute on function public.tala_admin_set_password(text, text) to authenticated;
