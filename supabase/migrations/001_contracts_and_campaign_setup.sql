-- Migration: Add contracts table + campaign setup fields
-- Run in Supabase SQL Editor

-- ============================================================
-- contracts — Auto-generated from deal report, signed by client
-- ============================================================
create table if not exists contracts (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references clients (id) on delete cascade,
  token text unique not null,
  offer_type text not null check (offer_type in ('pay_per_sit', 'foundation')),

  -- Deal terms (populated from deal report, editable)
  setup_fee numeric not null default 0,
  per_sit_fee numeric not null,
  daily_ad_budget numeric not null,
  bill_threshold integer not null default 100,
  start_date date not null,
  term_days integer not null default 90,

  -- Client info (copied from clients table for contract snapshot)
  client_business_name text not null,
  client_contact_name text not null,
  client_email text not null,
  client_phone text not null,

  -- Signature
  signer_name text,
  signer_ip text,
  signed_at timestamptz,

  -- Status
  status text not null default 'pending'
    check (status in ('pending', 'signed', 'voided')),

  -- Notes / overrides
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_contracts_token on contracts (token);
create index if not exists idx_contracts_client on contracts (client_id);

-- ============================================================
-- Add campaign setup fields to onboarding_data (new step 1)
-- ============================================================
ALTER TABLE onboarding_data
  ADD COLUMN IF NOT EXISTS target_zips text,
  ADD COLUMN IF NOT EXISTS bill_threshold integer DEFAULT 100,
  ADD COLUMN IF NOT EXISTS appointment_days text,
  ADD COLUMN IF NOT EXISTS appointment_times text,
  ADD COLUMN IF NOT EXISTS dealbreaker_tile_roof boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS dealbreaker_mobile_home boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS dealbreaker_hoa boolean DEFAULT false;

-- Columns the app references but original schema missed
ALTER TABLE onboarding_data
  ADD COLUMN IF NOT EXISTS company_display_name text,
  ADD COLUMN IF NOT EXISTS avg_profit_per_install text,
  ADD COLUMN IF NOT EXISTS deal_breakers text,
  ADD COLUMN IF NOT EXISTS ad_photos_url text,
  ADD COLUMN IF NOT EXISTS home_address text;
