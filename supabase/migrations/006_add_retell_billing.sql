-- Migration: Track client-owned Retell/billing connection (Step 4 of onboarding)
-- Run in Supabase SQL Editor

ALTER TABLE onboarding_data
  ADD COLUMN IF NOT EXISTS retell_billing_connected boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS retell_notes text;
