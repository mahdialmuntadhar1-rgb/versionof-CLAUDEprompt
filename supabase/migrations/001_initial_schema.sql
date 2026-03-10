-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Cities table
create table if not exists cities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_ar text,
  created_at timestamptz default now()
);

-- Categories table
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_ar text,
  icon text,
  created_at timestamptz default now()
);

-- Businesses table
create table if not exists businesses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  name_ar text,
  description text,
  category_id uuid references categories(id),
  city_id uuid references cities(id),
  address text,
  phone text,
  rating numeric(2,1) default 0,
  image_url text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- Events table
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  city_id uuid references cities(id),
  location text,
  event_date timestamptz,
  image_url text,
  created_at timestamptz default now()
);

-- Seed cities
insert into cities (name, name_ar) values
  ('Baghdad', 'بغداد'),
  ('Erbil', 'أربيل'),
  ('Sulaymaniyah', 'السليمانية'),
  ('Basra', 'البصرة'),
  ('Najaf', 'النجف'),
  ('Karbala', 'كربلاء'),
  ('Mosul', 'الموصل')
on conflict do nothing;

-- Seed categories
insert into categories (name, name_ar, icon) values
  ('Restaurants', 'مطاعم', '🍽️'),
  ('Cafés', 'مقاهي', '☕'),
  ('Shisha Lounges', 'أماكن الشيشة', '💨'),
  ('Shopping', 'تسوق', '🛍️'),
  ('Hotels', 'فنادق', '🏨'),
  ('Cultural Places', 'أماكن ثقافية', '🏛️'),
  ('Events', 'فعاليات', '🎉'),
  ('Deals', 'عروض', '🏷️')
on conflict do nothing;

-- Enable Row Level Security
alter table businesses enable row level security;
alter table events enable row level security;
alter table cities enable row level security;
alter table categories enable row level security;

-- Public read access
create policy "Public read businesses" on businesses for select using (true);
create policy "Public read events" on events for select using (true);
create policy "Public read cities" on cities for select using (true);
create policy "Public read categories" on categories for select using (true);
