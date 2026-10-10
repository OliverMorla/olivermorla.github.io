-- Better Auth tables (src/lib/auth.ts: core + admin plugin + DB rate limit),
-- all prefixed auth_ so Payload's schema push leaves them alone. Applied to
-- production on 2026-10-09. Equivalent to `pnpm dlx auth@latest migrate`,
-- plus RLS: Supabase's Data API exposes the public schema, and with RLS on
-- and no policies, the anon/authenticated roles can't read these tables. The
-- app connects as the database owner, which bypasses RLS.

create table if not exists public.auth_user (
  "id" text primary key,
  "name" text not null,
  "email" text not null unique,
  "emailVerified" boolean not null default false,
  "image" text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "role" text,
  "banned" boolean default false,
  "banReason" text,
  "banExpires" timestamptz
);

create table if not exists public.auth_session (
  "id" text primary key,
  "expiresAt" timestamptz not null,
  "token" text not null unique,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null,
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references public.auth_user ("id") on delete cascade,
  "impersonatedBy" text
);
create index if not exists auth_session_user_id_idx on public.auth_session ("userId");

create table if not exists public.auth_account (
  "id" text primary key,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references public.auth_user ("id") on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  "scope" text,
  "password" text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null
);
create index if not exists auth_account_user_id_idx on public.auth_account ("userId");

create table if not exists public.auth_verification (
  "id" text primary key,
  "identifier" text not null,
  "value" text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index if not exists auth_verification_identifier_idx on public.auth_verification ("identifier");

create table if not exists public.auth_rate_limit (
  "id" text primary key,
  "key" text not null unique,
  "count" integer not null,
  "lastRequest" bigint not null
);

alter table public.auth_user enable row level security;
alter table public.auth_session enable row level security;
alter table public.auth_account enable row level security;
alter table public.auth_verification enable row level security;
alter table public.auth_rate_limit enable row level security;
