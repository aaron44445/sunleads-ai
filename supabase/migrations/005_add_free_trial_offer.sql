-- Migration: Add Free Trial offer type (3-week no-cost trial)
-- Run in Supabase SQL Editor

alter table contracts
  drop constraint if exists contracts_offer_type_check;

alter table contracts
  add constraint contracts_offer_type_check
  check (offer_type in ('pay_per_sit', 'foundation', 'pif', 'free_trial'));
