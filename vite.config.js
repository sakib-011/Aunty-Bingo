import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import nodemailer from 'nodemailer';

/**
 * Vite Dev Server Plugin: /api/send-otp
 * Emulates the Vercel serverless function during local development
 * so Gmail OTP emails can be sent right from the dev server.
 */
function devOtpPlugin() {
  return {
    name: 'dev-otp-api',
    configureServer(server) {
      server.middlewares.use('/api/send-otp', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { email, otp, appPassword } = data;
            const targetEmail = (email || 'sakibshourov001@gmail.com').trim().toLowerCase();

            if (targetEmail !== 'sakibshourov001@gmail.com') {
              res.statusCode = 403;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ sent: false, error: 'Unauthorized email address' }));
              return;
            }

            const rawPass = (appPassword || process.env.GMAIL_APP_PASSWORD || process.env.VITE_GMAIL_APP_PASSWORD || '').trim();
            const cleanPassword = rawPass.replace(/\s+/g, '');

            if (!cleanPassword) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                sent: false,
                reason: 'NO_APP_PASSWORD',
                message: 'Gmail App Password is not configured. Fallback OTP provided.',
                otp
              }));
              return;
            }

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: targetEmail,
                pass: cleanPassword
              }
            });

            await transporter.sendMail({
              from: `"Aunty Bingo Admin" <${targetEmail}>`,
              to: targetEmail,
              subject: `[Aunty Bingo] আপনার অ্যাডমিন লগইন ওটিপি কোড: ${otp}`,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background: #FFF6E5; color: #2B1B17; border-radius: 16px; border: 2px solid #D8C6B6; max-width: 480px; margin: 0 auto;">
                  <h2 style="color: #8E1B3A; margin: 0 0 8px;">👵 আন্টি বিঙ্গো (Aunty Bingo)</h2>
                  <p style="color: #6E554D; font-size: 14px; margin: 0 0 16px;">ক্রিয়েটর হাব অ্যাডমিন ভেরিফিকেশন ওটিপি</p>
                  <p style="margin: 0 0 12px; font-size: 14px;">প্রিয় সাকিব ভাই, আপনার অ্যাডমিন প্যানেল লগইন ওটিপি কোড:</p>
                  <div style="font-size: 34px; font-weight: bold; font-family: monospace; letter-spacing: 6px; color: #8E1B3A; background: #FFFDF9; border: 2px solid #8E1B3A; border-radius: 12px; padding: 12px; text-align: center; margin: 16px 0;">
                    ${otp}
                  </div>
                  <p style="font-size: 12px; color: #6E554D; margin: 0 0 8px;">⏳ কোডটি আগামী ৫ মিনিটের মধ্যে ব্যবহার করুন।</p>
                  <p style="font-size: 11px; color: #842029; background: #FFF1F1; padding: 8px 12px; border-radius: 6px; margin: 12px 0 0;">নিরাপত্তা বার্তা: আপনি যদি এই অনুরোধ না করে থাকেন, তবে এই ইমেইলটি উপেক্ষা করুন।</p>
                </div>
              `
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ sent: true, email: targetEmail }));
          } catch (err) {
            console.error('[Dev OTP Error]:', err.message);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              sent: false,
              reason: 'SMTP_ERROR',
              error: err.message,
              otp: JSON.parse(body || '{}').otp
            }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    devOtpPlugin()
  ],
});
