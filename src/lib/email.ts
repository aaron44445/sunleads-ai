import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("Missing RESEND_API_KEY");
    }
    _resend = new Resend(key);
  }
  return _resend;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sunleadsai.com";

export async function sendOnboardingEmail(
  to: string,
  contactName: string,
  companyName: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  const onboardUrl = `${BASE_URL}/onboard/${token}`;

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from: "SunLeads AI <onboarding@sunleadsai.com>",
      to,
      subject: `${companyName} — Your SunLeads AI Setup Link`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 22px; font-weight: 700; margin: 0;">SunLeads AI</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hey ${contactName},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            Welcome aboard. Your onboarding setup is ready — it takes about 10 minutes
            and covers everything we need to launch your first campaign.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${onboardUrl}"
               style="display: inline-block; padding: 14px 32px; background: #7FFF00; color: #080B10; font-weight: 700; font-size: 15px; text-decoration: none; border-radius: 8px;">
              Start Setup
            </a>
          </div>
          <p style="font-size: 14px; line-height: 1.6; color: #666;">
            You can close this and come back anytime — your progress saves automatically.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #666;">
            If you have questions, reply to this email or message us in Slack once you join.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            SunLeads AI &middot; AI-Powered Solar Lead Generation
          </p>
        </div>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
