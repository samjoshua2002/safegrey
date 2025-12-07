import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

export async function createGoogleMeetEvent(
    name: string,
    email: string,
    topic: string,
    startTime: string, // ISO string
    timezone: string
) {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
        throw new Error('Missing Google OAuth credentials');
    }

    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 mins later

    const event = {
        summary: `Assessment: ${topic} - ${name}`,
        description: `Security Assessment with ${name} (${email}).\nTopic: ${topic}`,
        start: {
            dateTime: startDateTime.toISOString(),
            timeZone: timezone,
        },
        end: {
            dateTime: endDateTime.toISOString(),
            timeZone: timezone,
        },
        conferenceData: {
            createRequest: {
                requestId: Math.random().toString(36).substring(7),
                conferenceSolutionKey: {
                    type: 'hangoutsMeet',
                },
            },
        },
        attendees: [{ email }],
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1, // Required to generate Meet link
        });

        return response.data.hangoutLink;
    } catch (error) {
        console.error('Error creating Google Calendar event:', error);
        throw error;
    }
}
