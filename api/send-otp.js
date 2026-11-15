import nodemailer from 'nodemailer';

/**
 * Serverless API Route: /api/send-otp
 * Dispatches real 6-digit OTP email using Gmail SMTP and 16-character App Password.
 * Works seamlessly on Vercel, Netlify Functions, and Node.js backends.
 */
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;

    // Parse body if delivered as raw string
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // use as is
      }
    }

    const { email, otp, appPassword } = body || {};
    const targetEmail = (email || 'sakibshourov001@gmail.com').trim().toLowerCase();

    // Security guard: only allow authorized admin
    if (targetEmail !== 'sakibshourov001@gmail.com') {
      return res.status(403).json({
        sent: false,
        reason: 'UNAUTHORIZED_EMAIL',
        error: 'Only authorized administrator email can receive admin OTP.'
      });
    }

    // Resolve Google App Password from request body or server environment variable
    const rawPass = (appPassword || process.env.GMAIL_APP_PASSWORD || process.env.VITE_GMAIL_APP_PASSWORD || '').trim();
    const cleanPassword = rawPass.replace(/\s+/g, ''); // Google App Passwords have spaces like "abcd efgh ijkl mnop"

    if (!cleanPassword) {
      return res.status(200).json({
        sent: false,
        reason: 'NO_APP_PASSWORD',
        message: 'Gmail App Password is not configured yet. Fallback OTP provided for testing.',
        otp
      });
    }

    // Configure Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: targetEmail,
        pass: cleanPassword
      }
    });

    const emailHtml = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <title>Aunty Bingo Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF6E5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2B1B17;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 480px; background-color: #FFFDF9; border: 2px solid #D8C6B6; border-radius: 20px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <tr>
            <td align="center" style="padding-bottom: 16px;">
              <div style="font-size: 36px; margin-bottom: 8px;">👵</div>
              <h2 style="margin: 0; color: #8E1B3A; font-size: 22px;">আন্টি বিঙ্গো (Aunty Bingo)</h2>
              <p style="margin: 4px 0 0; color: #6E554D; font-size: 13px;">ক্রিয়েটর হাব অ্যাডমিন ভেরিফিকেশন ওটিপি</p>
            </td>
          </tr>
          <tr>
            <td>
              <hr style="border: 0; border-top: 1px dashed #D8C6B6; margin: 12px 0 20px;">
            </td>
          </tr>
          <tr>
            <td style="font-size: 14px; line-height: 1.6; color: #2B1B17;">
              <p style="margin: 0 0 12px;">প্রিয় <strong>সাকিব ভাই</strong>,</p>
              <p style="margin: 0 0 20px; color: #6E554D;">
                আন্টি বিঙ্গোর অ্যাডমিন প্যানেলে প্রবেশ করার জন্য আপনার ওটিপি (OTP) কোডটি নিচে দেওয়া হলো। কোডটি আগামী <strong>৫ মিনিটের</strong> মধ্যে ব্যবহার করুন:
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 10px 0 20px;">
              <div style="background-color: #FFF6E5; border: 2px solid #8E1B3A; border-radius: 12px; padding: 14px 24px; display: inline-block;">
                <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #8E1B3A;">
                  ${otp}
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="font-size: 12px; color: #8A7268; text-align: center; padding-bottom: 20px;">
              ⏳ মেয়াদ: ৫ মিনিট। এই কোডটি কারো সাথে শেয়ার করবেন না।
            </td>
          </tr>
          <tr>
            <td style="background-color: #FFF1F1; border: 1px solid #F5C2C7; border-radius: 8px; padding: 10px 14px; font-size: 11px; color: #842029;">
              <strong>নিরাপত্তা বার্তা:</strong> যদি আপনি এই অনুরোধটি না করে থাকেন, তবে নির্দ্বিধায় এই ইমেইলটি উপেক্ষা করুন।
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const info = await transporter.sendMail({
      from: `"Aunty Bingo Admin" <${targetEmail}>`,
      to: targetEmail,
      subject: `[Aunty Bingo] আপনার অ্যাডমিন লগইন ওটিপি কোড: ${otp}`,
      html: emailHtml
    });

    return res.status(200).json({
      sent: true,
      messageId: info.messageId,
      email: targetEmail
    });
  } catch (err) {
    console.error('[API send-otp Error]:', err);
    return res.status(200).json({
      sent: false,
      reason: 'SMTP_ERROR',
      error: err.message,
      otp: req.body?.otp
    });
  }
}
