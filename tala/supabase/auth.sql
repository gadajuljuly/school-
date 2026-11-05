-- Sign-in by phone + password, password reset by e-mail. Run once after schema.sql.
-- Each teacher's account is her real e-mail; her phone number is linked to it here,
-- so she signs in with phone + password and "שכחתי סיסמה" sends a reset link to her e-mail.
create table if not exists public.tala_phones (
  phone      text primary key,          -- international digits, e.g. 972501234567
  email      text not null unique,
  created_at timestamptz not null default now()
);
alter table public.tala_phones enable row level security;   -- no policies: reachable only through the functions below
revoke all on public.tala_phones from anon, authenticated;

-- Right after registration: link the phone to the signed-in teacher.
create or replace function public.tala_register_phone(p_phone text) returns text
language plpgsql security definer set search_path = public as $$
declare me text := lower(auth.jwt() ->> 'email');
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if p_phone !~ '^[0-9]{11,13}$' then return 'bad-phone'; end if;
  if exists (select 1 from public.tala_phones where phone = p_phone and email <> me) then return 'taken'; end if;
  insert into public.tala_phones (phone, email) values (p_phone, me)
  on conflict (email) do update set phone = excluded.phone;
  return 'ok';
end $$;

-- Sign-in screen: the e-mail behind a phone number (null if not registered).
create or replace function public.tala_email_for_phone(p_phone text) returns text
language sql stable security definer set search_path = public as $$
  select email from public.tala_phones where phone = p_phone;
$$;

-- Administrator: registered teachers, and setting a temporary password.
drop function if exists public.tala_admin_users();
create or replace function public.tala_admin_users()
returns table (email text, name text, phone text, created_at timestamptz, last_sign_in_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.tala_is_admin() then raise exception 'not allowed'; end if;
  return query select u.email::text, (u.raw_user_meta_data ->> 'name')::text, p.phone, u.created_at, u.last_sign_in_at
    from auth.users u left join public.tala_phones p on p.email = lower(u.email)
    order by 2 nulls last, 1;
end $$;

create extension if not exists pgcrypto with schema extensions;
create or replace function public.tala_admin_set_password(p_email text, p_password text) returns boolean
language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public.tala_is_admin() then raise exception 'not allowed'; end if;
  if length(coalesce(p_password, '')) < 6 then raise exception 'weak'; end if;
  update auth.users set encrypted_password = crypt(p_password, gen_salt('bf')), updated_at = now() where lower(email) = lower(p_email);
  return found;
end $$;

revoke execute on function public.tala_register_phone(text), public.tala_email_for_phone(text),
  public.tala_admin_users(), public.tala_admin_set_password(text, text) from public;
grant execute on function public.tala_register_phone(text) to authenticated;
grant execute on function public.tala_email_for_phone(text) to anon, authenticated;
grant execute on function public.tala_admin_users() to authenticated;
grant execute on function public.tala_admin_set_password(text, text) to authenticated;
