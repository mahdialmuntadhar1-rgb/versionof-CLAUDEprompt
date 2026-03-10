-- Cities
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ar text,
  image_url text
);
insert into cities (name, name_ar) values
  ('Baghdad', 'بغداد'),('Erbil', 'أربيل'),('Sulaymaniyah', 'السليمانية'),
  ('Basra', 'البصرة'),('Najaf', 'النجف'),('Karbala', 'كربلاء'),('Mosul', 'الموصل')
on conflict do nothing;

-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  slug text unique
);
insert into categories (name, icon, slug) values
  ('Restaurants', '🍽️', 'restaurants'),('Cafes', '☕', 'cafes'),
  ('Shisha', '💨', 'shisha'),('Shopping', '🛍️', 'shopping'),
  ('Hotels', '🏨', 'hotels'),('Cultural', '🏛️', 'cultural'),
  ('Events', '🎉', 'events')
on conflict do nothing;

-- Businesses
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  city_id uuid references cities(id),
  category_id uuid references categories(id),
  top_rated boolean default false,
  image_url text,
  address text,
  phone text,
  created_at timestamptz default now()
);

-- Events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamptz,
  city_id uuid references cities(id),
  image_url text
);

-- RLS
alter table cities enable row level security;
alter table categories enable row level security;
alter table businesses enable row level security;
alter table events enable row level security;
create policy "public read cities" on cities for select using (true);
create policy "public read categories" on categories for select using (true);
create policy "public read businesses" on businesses for select using (true);
create policy "public read events" on events for select using (true);
