import nodemailer from "nodemailer";

const buildResetPasswordEmailHtml = (
  firstName: string,
  lastName: string,
  resetLink: string,
  appName: string
) => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#111827; padding:24px 32px;">
              <span style="color:#ffffff; font-size:18px; font-weight:600;">${appName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px; color:#111827; font-size:20px;">Reset your password</h2>
              <p style="margin:0 0 24px; color:#4b5563; font-size:14px; line-height:1.5;">
                Hi ${firstName} ${lastName}, click the button below to reset your password. This link expires in <strong>15 minutes</strong>.
              </p>
              <div style="text-align:center; margin-bottom:24px;">
                <a href="${resetLink}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:14px; font-weight:600;">
                  Reset Password
                </a>
              </div>
              <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.5;">
                If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px; background:#f9fafb; border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#9ca3af; font-size:11px;">© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const sendResetPasswordEmail = async (
  email: string,
  firstName: string,
  lastName: string,
  resetLink: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASS,
    },
  });

  const appName = process.env.APP_NAME || "BaseAuth";

  await transporter.sendMail({
    from: `"${appName}" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Reset your ${appName} password`,
    text: `Hi ${firstName}, reset your password using this link: ${resetLink}. It expires in 15 minutes. If you didn't request this, ignore this email.`,
    html: buildResetPasswordEmailHtml(firstName, lastName, resetLink, appName),
  });
};