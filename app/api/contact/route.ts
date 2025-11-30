import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function getEmailTemplate(data: any): string {
    const { firstName, lastName, email, company, designation, phone } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Request - Safegrey</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f0606 0%, #ae2012 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                Safegrey
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                New Contact Request
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                New Inquiry Received 📨
              </h2>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                You have received a new contact request from the website. Here are the details:
              </p>
              
              <!-- Details Table -->
              <table role="presentation" style="width: 100%; margin: 20px 0; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px; width: 140px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;">Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;">Company</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${company || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #718096; font-size: 14px;">Designation</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1a1a1a; font-size: 16px; font-weight: 500;">${designation || 'N/A'}</td>
                </tr>
              </table>

              <div style="background-color: #f7fafc; border-radius: 8px; padding: 20px; margin-top: 20px;">
                <p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Timestamp</p>
                <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 14px; font-family: monospace;">${new Date().toLocaleString()}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">
                <strong style="color: #4a5568;">Safegrey</strong>
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                © ${new Date().getFullYear()} Safegrey. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getAutoReplyTemplate(firstName: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We've received your message - Safegrey</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f0606 0%, #ae2012 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                Safegrey
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Thank You for Contacting Us
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                Hello ${firstName}, 👋
              </h2>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to Safegrey. We have received your message and our team is currently reviewing your inquiry.
              </p>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                One of our security experts will get back to you within 24 hours to discuss your requirements.
              </p>
              
              <div style="background-color: #f7fafc; border-left: 4px solid #ae2012; padding: 16px; margin: 24px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #4a5568; font-size: 14px; font-style: italic;">
                  "Securing your digital future, one step at a time."
                </p>
              </div>

              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our <a href="https://safegrey.com/services" style="color: #ae2012; text-decoration: none; font-weight: 500;">services</a> or read our latest <a href="https://safegrey.com/about" style="color: #ae2012; text-decoration: none; font-weight: 500;">security insights</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">
                <strong style="color: #4a5568;">Safegrey</strong>
              </p>
              <p style="margin: 0 0 4px 0; color: #718096; font-size: 13px;">
                123 Security Boulevard, Suite 500<br>San Francisco, CA 94105
              </p>
              <p style="margin: 16px 0 0 0; color: #a0aec0; font-size: 12px;">
                © ${new Date().getFullYear()} Safegrey. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { firstName, lastName, email, company, designation, phone } = body;

        // Basic validation
        if (!firstName || !lastName || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure transporter with new credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.contact_USER,
                pass: process.env.contact_PASS,
            },
        });

        // 1. Send notification to Admin
        const adminMailOptions = {
            from: `"Safegrey Website" <${process.env.contact_USER}>`,
            to: process.env.contact_USER, // Sending to self/admin
            replyTo: email,
            subject: `New Contact: ${firstName} ${lastName} from ${company || 'Website'}`,
            html: getEmailTemplate(body),
        };

        // 2. Send auto-reply to User
        const userMailOptions = {
            from: `"Safegrey Security" <${process.env.contact_USER}>`,
            to: email,
            subject: `We've received your message - Safegrey`,
            html: getAutoReplyTemplate(firstName),
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ message: 'Messages sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
