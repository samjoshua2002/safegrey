import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db';
import Booking from '@/models/Booking';
import { z } from 'zod';
import { createGoogleMeetEvent } from '@/lib/google-calendar';

// Zod schema for validation
const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    topic: z.string().min(1, "Topic is required"),
    notes: z.string().optional(),
    date: z.string().min(1, "Date is required"), // Expecting ISO string or similar
    time: z.string().min(1, "Time is required"),
    timezone: z.string().min(1, "Timezone is required"),
});

function getMockMeetingLink() {
    // Generate a format like abc-defg-hij
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const segment = (length: number) =>
        Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `https://meet.google.com/${segment(3)}-${segment(4)}-${segment(3)}`;
}

function getEmailTemplate(name: string, topic: string, date: string, time: string, timezone: string, meetingLink: string, isMock: boolean): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed - SafeGrey</title>
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
                Appointment Confirmation
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                Hello, ${name}! 👋
              </h2>
              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Your appointment for <strong>${topic}</strong> has been successfully scheduled. We look forward to speaking with you.
              </p>
              
              <!-- Details Card -->
              <table role="presentation" style="width: 100%; margin: 24px 0; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding-bottom: 12px; color: #718096; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Date & Time</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px; color: #1a1a1a; font-size: 16px; font-weight: 500;">
                          ${date} at ${time} (${timezone})
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px; color: #718096; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Topic</td>
                      </tr>
                      <tr>
                        <td style="color: #1a1a1a; font-size: 16px; font-weight: 500;">
                          ${topic}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Please verify your meeting link below:
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <table role="presentation" style="margin: 0 auto;">
                <tr>
                  <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 8px; padding: 16px 32px;">
                    <a href="${meetingLink}" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">
                      Join Google Meet
                    </a>
                  </td>
                </tr>
              </table>
             <p style="margin: 16px 0 0 0; color: #718096; font-size: 14px;">
                Link: <a href="${meetingLink}" style="color: #3b82f6;">${meetingLink}</a>
              </p>
              ${isMock ? `
              <p style="margin: 8px 0 0 0; color: #a0aec0; font-size: 12px; font-style: italic;">
                Note: This is a generated placeholder link for demonstration. Google Calendar integration is not fully configured.
              </p>` : ''}
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

        // Validate with Zod
        const result = bookingSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, topic, notes, date, time, timezone } = result.data;

        // Generate meeting link (Real or Mock)
        let meetingLink = "";
        let isMock = false;

        try {
            // Attempt to create real Google Calendar Event
            // Date string validation - ensure valid ISO or date object
            const bookingDate = new Date(date);
            // Assuming time is "HH:mm" or similar, we might need to combine date+time for precision, 
            // but the helper takes an ISO string. Let's construct a proper ISO string if needed.
            // The modal sends `date` as ISO string (e.g., "2023-10-27T00:00:00.000Z") and `time` as "10:00am".
            // We need to parse this effectively.

            // Helper function to combine date and time string into a Date object
            const combineDateTime = (dateStr: string, timeStr: string) => {
                const d = new Date(dateStr);
                const [time, period] = timeStr.split(/(?=[ap]m)/i);
                let [hours, minutes] = time.split(':').map(Number);

                if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
                if (period.toLowerCase() === 'am' && hours === 12) hours = 0;

                d.setHours(hours, minutes, 0, 0);
                return d;
            };

            const eventStart = combineDateTime(date, time);

            meetingLink = await createGoogleMeetEvent(name, email, topic, eventStart.toISOString(), timezone);
        } catch (calendarError) {
            console.warn("Google Calendar API failed, falling back to mock link:", calendarError);
            meetingLink = getMockMeetingLink();
            isMock = true;
        }

        // Connect to DB and Save
        try {
            await connectDB();
            // Format date properly from string if needed, or pass as is if schema handles it
            // Mongoose casts string to date automatically if valid format
            await Booking.create({
                name,
                email,
                topic,
                notes,
                date: new Date(date), // Ensure it's a Date object
                time,
                timezone,
                meetingLink,
            });
        } catch (dbError) {
            console.error('Error saving booking to database:', dbError);
            return NextResponse.json(
                { error: 'Failed to save booking' },
                { status: 500 }
            );
        }

        // Send Email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: {
                    name: 'SafeGrey Security',
                    address: process.env.EMAIL_USER!,
                },
                to: email,
                subject: `Appointment Confirmed: ${topic} - SafeGrey`,
                html: getEmailTemplate(name, topic, date, time, timezone, meetingLink, isMock),
            };

            await transporter.sendMail(mailOptions);

        } catch (emailError) {
            console.error('Error sending booking email:', emailError);
            // We still return success for the booking itself, but maybe warn? 
            // Or fail? Usually better to fail distinctively or just log.
            // Since booking is saved, we return success but log error.
        }

        return NextResponse.json(
            { message: 'Appointment booked successfully', meetingLink },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing booking:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
