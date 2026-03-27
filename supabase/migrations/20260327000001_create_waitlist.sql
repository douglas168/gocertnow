-- Waitlist table for pre-launch email capture
create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  lang        text not null default 'en' check (lang in ('en', 'zh')),
  created_at  timestamptz not null default now()
);

-- Only the service role can read/delete; anon can insert (sign up)
alter table waitlist enable row level security;

create policy "Anyone can join waitlist"
  on waitlist for insert
  to anon
  with check (true);

create policy "Service role can read waitlist"
  on waitlist for select
  to service_role
  using (true);
