-- Migration: Add PIF (Paid In Full) offer type
-- Run in Supabase SQL Editor

-- Drop the existing offer_type check (default name), re-add with 'pif'
alter table contracts
  drop constraint if exists contracts_offer_type_check;

alter table contracts
  add constraint contracts_offer_type_check
  check (offer_type in ('pay_per_sit', 'foundation', 'pif'));

-- PIF-only fields — nullable so legacy rows remain valid
alter table contracts
  add column if not exists pif_amount numeric,
  add column if not exists sit_count integer;
