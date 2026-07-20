-- Migration: Add Individual Self-Gen client variant
-- Run in Supabase SQL Editor

-- Discriminator on clients
alter table clients
  add column if not exists client_type text not null default 'company_owner';

alter table clients
  drop constraint if exists clients_client_type_check;

alter table clients
  add constraint clients_client_type_check
  check (client_type in ('company_owner', 'individual_closer'));

-- Snapshot the discriminator on contracts so rendering is self-contained
alter table contracts
  add column if not exists client_type text not null default 'company_owner';

alter table contracts
  drop constraint if exists contracts_client_type_check;

alter table contracts
  add constraint contracts_client_type_check
  check (client_type in ('company_owner', 'individual_closer'));

-- Individual-variant onboarding fields (all nullable / defaulted for legacy rows)
alter table onboarding_data
  add column if not exists owner_approval_confirmed boolean not null default false,
  add column if not exists fb_page_access text,
  add column if not exists desired_page_name text,
  add column if not exists personal_payment_method text;

alter table onboarding_data
  drop constraint if exists onboarding_data_fb_page_access_check;

alter table onboarding_data
  add constraint onboarding_data_fb_page_access_check
  check (fb_page_access is null or fb_page_access in ('has_admin', 'needs_new_page'));
