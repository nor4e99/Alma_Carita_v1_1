# Качване — Vercel + Supabase

Две части:
- **Сега (Фаза 1):** качване във Vercel. Бързо, без база, без env vars.
- **После (Фаза 2):** добавяне на Supabase за реални данни, логин и снимки.

---

# ЧАСТ 1 — Vercel (сега)

Прототипът няма външни услуги, затова деплойът е директен и **не иска никакви environment variables**.

> За притеснението „мога ли да почна нов проект": да — Vercel дава **неограничено проекти на безплатния (Hobby) план**. Този прототип спокойно се събира там.

## Вариант А — GitHub (препоръчителен)

Дава автоматичен deploy при всяка промяна.

```bash
git init
git add .
git commit -m "Alma Carita — лична платформа, 4 стълба"
git branch -M main
git remote add origin https://github.com/<твой-профил>/alma-carita.git
git push -u origin main
```

После в [vercel.com](https://vercel.com):
1. **Add New → Project**
2. Избери репото `alma-carita`
3. Vercel разпознава Next.js сам — **не променяй нищо**
4. **Deploy**

След ~1 минута получаваш линк `https://alma-carita-xxx.vercel.app`. Този линк праща на Карина. Всяка следваща промяна: `git push` → нов deploy автоматично.

## Вариант Б — CLI (без GitHub)

```bash
npm install -g vercel
vercel login
vercel            # следвай въпросите, Enter за стойности по подразбиране
vercel --prod     # финален публичен линк
```

## Проверка преди качване
```bash
npm run build     # трябва: ✓ Compiled successfully
```

---

# ЧАСТ 2 — Supabase (Фаза 2)

Когато сте готови с реални данни. Архитектурата вече е подготвена — UI не се пипа.

## 1. Създай Supabase проект
- Влез в [supabase.com](https://supabase.com) → **New project**
- Безплатният план е достатъчен за старт
- Запиши си **Project URL** и **anon key** (Settings → API)

## 2. Инсталирай клиента
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## 3. Env vars

Локално в `.env.local`, а във Vercel → **Settings → Environment Variables**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # само server-side, за admin
```
`.env.local` вече е в `.gitignore` — няма да се качи случайно.

## 4. Таблици (SQL Editor в Supabase)

Полетата следват точно типовете в `lib/types.ts`:

```sql
create table properties (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,           -- new | old | land
  status text not null,         -- active | pending | sold | rented | draft
  deal text not null,           -- sale | rent
  price numeric not null,
  currency text not null,
  area text, city text, address text,
  lat double precision, lng double precision,
  rooms int, bathrooms int, area_m2 numeric,
  floor int, total_floors int, year_built int,
  description text, features text[],
  energy_class text, orientation text,
  admin_notes text,
  views int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table property_images (
  id text primary key,
  property_id text references properties(id) on delete cascade,
  url text not null, alt text, is_cover boolean default false
);

create table inquiries (
  id text primary key,
  source text not null,         -- property | training | children | general
  property_id text, property_name text,
  training_id text, training_name text,
  name text not null, email text not null, phone text,
  message text not null,
  status text default 'new',    -- new | replied | archived
  created_at timestamptz default now()
);

create table trainings (
  id text primary key, slug text unique not null,
  title text not null, tagline text, audience text, format text,
  description text, highlights text[], method text, duration text,
  gradient text, published boolean default false,
  created_at timestamptz default now()
);

create table events (
  id text primary key, slug text unique not null,
  title text not null, date timestamptz, location text,
  excerpt text, body text, gallery text[], role text,
  published boolean default false
);
```

## 5. Свържи кода
- Разкоментирай `lib/supabase/client.ts`
- В `lib/data/queries.ts` замени mock логиката с реални заявки. **Имената на функциите остават същите** → нито един компонент не се пипа. Пример:
  ```ts
  export async function getActiveProperties() {
    const supabase = createServerSupabase();
    const { data } = await supabase
      .from('properties').select('*').eq('status', 'active');
    return data ?? [];
  }
  ```

## 6. Логин (Supabase Auth)
- В `app/(admin-login)/admin/login/page.tsx` замени симулирания `setTimeout(... router.push)` с реален `supabase.auth.signInWithPassword(...)`
- Добави `middleware.ts` в корена за защита на `/admin` маршрутите
- Създай потребител за Карина в Supabase → Authentication

## 7. Снимки (Supabase Storage)
- Създай bucket `property-images`
- В property edit формата замени избора на градиент с реален upload
- Градиентите остават като fallback

---

## Какво НЕ е нужно сега (Фаза 1)
- ❌ Environment variables
- ❌ Supabase
- ❌ База данни

Качи прототипа във Vercel (Част 1), покажи на Карина, и минаваме на Част 2 когато е готова.
