/**
 * Aunty Bingo Email Service
 * Handles dispatching real OTP emails to sakibshourov001@gmail.com
 * Supports Gmail SMTP with 16-character Google App Password
 */

export const ADMIN_EMAIL = 'sakibshourov001@gmail.com';
export const GMAIL_APP_PASSWORD_STORAGE_KEY = 'aunty_admin_gmail_app_password';

/**
 * Retrieve saved App Password from localStorage (if configured via UI)
 */
export function getStoredAppPassword() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GMAIL_APP_PASSWORD_STORAGE_KEY) || '';
}

/**
 * Save App Password to localStorage for future OTP requests
 */
export function setStoredAppPassword(password) {
  if (typeof window === 'undefined') return;
  if (!password) {
    localStorage.removeItem(GMAIL_APP_PASSWORD_STORAGE_KEY);
  } else {
    localStorage.setItem(GMAIL_APP_PASSWORD_STORAGE_KEY, password.trim());
  }
}

/**
 * Check whether an App Password has been saved
 */
export function hasStoredAppPassword() {
  return Boolean(getStoredAppPassword());
}

/**
 * Format HTML template for the OTP email with Aunty Bingo branding
 */
export function createOtpHtmlEmail({ otp, email }) {
  return `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aunty Bingo Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6E5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2B1B17;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFF6E5; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 520px; background-color: #FFFDF9; border: 2px solid #D8C6B6; border-radius: 24px; padding: 36px 30px; box-shadow: 0 10px 25px rgba(142, 27, 58, 0.08);">
          <!-- Logo & Header -->
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <div style="width: 64px; height: 64px; border-radius: 20px; background-color: #8E1B3A; color: #FFF6E5; font-family: Georgia, serif; font-weight: 800; line-height: 64px; font-size: 26px; text-align: center; margin-bottom: 12px; display: inline-block; letter-spacing: 1px;">
                AB
              </div>
              <h1 style="margin: 0; color: #8E1B3A; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                আন্টি বিঙ্গো (Aunty Bingo)
              </h1>
              <p style="margin: 6px 0 0 0; color: #6E554D; font-size: 13px; font-weight: 600;">
                ক্রিয়েটর হাব অ্যাডমিন ভেরিফিকেশন ওটিপি
              </p>
            </td>
          </tr>

          <!-- Separator -->
          <tr>
            <td>
              <hr style="border: 0; border-top: 1px dashed #D8C6B6; margin: 10px 0 24px 0;">
            </td>
          </tr>

          <!-- Greeting & Instructions -->
          <tr>
            <td style="color: #2B1B17; font-size: 14px; line-height: 1.6;">
              <p style="margin: 0 0 12px 0;">
                প্রিয় <strong>সাকিব ভাই</strong>,
              </p>
              <p style="margin: 0 0 20px 0; color: #6E554D;">
                আন্টি বিঙ্গোর অ্যাডমিন প্যানেলে লগইন করার জন্য আপনার নিরাপদ ওটিপি (OTP) কোডটি নিচে দেওয়া হলো। এই কোডটি আগামী <strong>৫ মিনিটের</strong> মধ্যে ব্যবহার করুন:
              </p>
            </td>
          </tr>

          <!-- OTP Code Box -->
          <tr>
            <td align="center" style="padding: 10px 0 24px 0;">
              <div style="background-color: #FFF6E5; border: 2px solid #8E1B3A; border-radius: 16px; padding: 18px 24px; display: inline-block;">
                <div style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #8E1B3A;">
                  ${otp}
                </div>
              </div>
            </td>
          </tr>

          <!-- Expiry Notice -->
          <tr>
            <td style="color: #6E554D; font-size: 12px; line-height: 1.5; text-align: center; padding-bottom: 24px;">
              ⏳ মেয়াদ: কোডটি ৫ মিনিট পর অকার্যকর হবে।<br>
              এই কোডটি কারো সাথে শেয়ার করবেন না।
            </td>
          </tr>

          <!-- Security Alert Box -->
          <tr>
            <td style="background-color: #FFF1F1; border: 1px solid #F5C2C7; border-radius: 12px; padding: 12px 16px; font-size: 11px; color: #842029; line-height: 1.5;">
              <strong>নিরাপত্তা বার্তা:</strong> যদি আপনি এই লগইন অনুরোধটি না করে থাকেন, তবে নির্দ্বিধায় এই ইমেইলটি উপেক্ষা করুন। আপনার অ্যাকাউন্ট সম্পূর্ণ সুরক্ষিত রয়েছে।
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 28px; border-top: 1px solid #F0E6DD; margin-top: 24px; font-size: 11px; color: #8A7268;">
              <p style="margin: 0;">প্রেরক: Aunty Bingo Security System</p>
              <p style="margin: 4px 0 0 0;">অনুমোদিত অ্যাডমিন: ${email}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Dispatch real OTP via /api/send-otp backend endpoint
 * Falls back gracefully if backend is unreachable or credentials are not yet set
 */
export async function sendAdminOtpEmail({ email = ADMIN_EMAIL, otp, appPassword = '' }) {
  const resolvedPassword = appPassword.trim() || getStoredAppPassword();

  try {
    const response = await fetch('/api/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        otp,
        appPassword: resolvedPassword
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        sent: false,
        reason: 'HTTP_ERROR',
        status: response.status,
        message: `HTTP ${response.status}: ${errorText}`
      };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    return {
      sent: false,
      reason: 'FETCH_FAILED',
      message: err.message || 'Network request failed'
    };
  }
}
