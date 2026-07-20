-- Migration: Allow contracts to defer the start date until onboarding permissions are provided
-- Run in Supabase SQL Editor

alter table contracts
  add column if not exists start_date_deferred boolean not null default false;
