export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  service_area: string;
  onboard_token: string;
  onboard_status: "pending" | "in_progress" | "completed";
  current_step: number;
  deal_closed_at: string;
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  id: string;
  client_id: string;

  // Step 1 — Campaign Setup
  target_zips: string | null;
  bill_threshold: number | null;
  appointment_days: string | null;
  appointment_times: string | null;
  dealbreaker_tile_roof: boolean;
  dealbreaker_mobile_home: boolean;
  dealbreaker_hoa: boolean;

  // Step 3 — Business / A2P info
  business_legal_name: string | null;
  ein: string | null;
  business_address: string | null;
  business_city: string | null;
  business_state: string | null;
  business_zip: string | null;
  authorized_rep_name: string | null;
  authorized_rep_title: string | null;
  authorized_rep_phone: string | null;
  authorized_rep_email: string | null;

  // Step 4 — Slack
  slack_joined: boolean;

  // Step 5 — Facebook
  fb_connected: boolean;
  fb_ad_account_id: string | null;
  fb_page_name: string | null;
  fb_notes: string | null;

  // Step 6 — Kickoff
  kickoff_booked: boolean;
  kickoff_booked_at: string | null;

  // Business info (collected in step 3)
  company_display_name: string | null;
  target_regions: string | null;
  avg_profit_per_install: string | null;
  deal_breakers: string | null;
  differentiators: string | null;
  financing_products: string | null;
  testimonials_url: string | null;
  logo_url: string | null;
  ad_photos_url: string | null;
  home_address: string | null;
  avg_system_size: string | null;
  monthly_install_volume: string | null;

  created_at: string;
  updated_at: string;
}

export interface DealReport {
  id: string;
  client_id: string;
  closer_name: string;
  deal_value: number;
  pricing_model: string;
  ad_spend_agreed: number;
  contract_months: number;
  notes: string | null;
  created_at: string;
}

export interface Contract {
  id: string;
  client_id: string;
  token: string;
  offer_type: "pay_per_sit" | "foundation";
  setup_fee: number;
  per_sit_fee: number;
  daily_ad_budget: number;
  bill_threshold: number;
  start_date: string;
  term_days: number;
  client_business_name: string;
  client_contact_name: string;
  client_email: string;
  client_phone: string;
  signer_name: string | null;
  signer_ip: string | null;
  signed_at: string | null;
  status: "pending" | "signed" | "voided";
  notes: string | null;
  created_at: string;
  updated_at: string;
}
