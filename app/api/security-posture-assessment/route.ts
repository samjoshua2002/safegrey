import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Personal email domains to block
const PERSONAL_EMAIL_DOMAINS = [
  'yahoo.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'mail.com',
  'zoho.com',
];

function isPersonalEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return PERSONAL_EMAIL_DOMAINS.includes(domain);
}

function getEmailTemplate(name: string, assessmentType: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${assessmentType} - SafeGrey</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #3a3f47ff 0%, #df1010ff 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                SafeGrey
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                Security Assessment Services
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                Hello, ${name}! 🛡️
              </h2>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in our comprehensive ${assessmentType} services. We're committed to helping you identify and address vulnerabilities across your digital infrastructure.
              </p>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                We've attached a detailed guide covering our assessment methodologies:
              </p>
              
              <!-- Features List -->
              <table role="presentation" style="width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 14px; font-weight: bold;">✓</span>
                          </div>
                        </td>
                        <td style="color: #4a5568; font-size: 15px; line-height: 1.5;">
                          Phishing Campaign Assessment
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 14px; font-weight: bold;">✓</span>
                          </div>
                        </td>
                        <td style="color: #4a5568; font-size: 15px; line-height: 1.5;">
                          Mystery Guest (Physical Security)
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 14px; font-weight: bold;">✓</span>
                          </div>
                        </td>
                        <td style="color: #4a5568; font-size: 15px; line-height: 1.5;">
                          Assumed Breach Assessment
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <span style="color: #ffffff; font-size: 14px; font-weight: bold;">✓</span>
                          </div>
                        </td>
                        <td style="color: #4a5568; font-size: 15px; line-height: 1.5;">
                          Traditional Red Team Assessment
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                The attached guide provides comprehensive details on our approach, methodology, and deliverables.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 8px; padding: 16px 32px;">
                    <a href="mailto:contact@safegrey.com" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
                      Schedule a Consultation
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="border-top: 1px solid #e2e8f0;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">
                <strong style="color: #4a5568;">SafeGrey</strong>
              </p>
              <p style="margin: 0 0 4px 0; color: #718096; font-size: 13px;">
                Expert-Led Security Assessment Services
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                © ${new Date().getFullYear()} SafeGrey. All rights reserved.
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, assessmentType } = body;

    // Validate inputs
    if (!name || !email || !assessmentType) {
      return NextResponse.json(
        { error: 'Name, email, and assessment type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email is personal
    if (isPersonalEmail(email)) {
      return NextResponse.json(
        { error: 'Please use your company email address. Personal email addresses (Gmail, Outlook, Yahoo, etc.) are not accepted.' },
        { status: 400 }
      );
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Get PDF path
    const pdfFilename = `${assessmentType}.pdf`;
    const pdfPath = path.join(process.cwd(), 'public', 'security-posture-assessment', pdfFilename);

    // Check if PDF exists
    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: 'PDF file not found' },
        { status: 500 }
      );
    }

    // Email options
    const mailOptions = {
      from: {
        name: 'SafeGrey Security',
        address: process.env.EMAIL_USER!,
      },
      to: email,
      subject: `${assessmentType} Guide - SafeGrey`,
      html: getEmailTemplate(name, assessmentType),
      attachments: [
        {
          filename: pdfFilename,
          path: pdfPath,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
