// app/services/email.server.ts
import { Resend } from "resend";
import { csrfToken } from "~/utils/security.server";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);


export async function sendEmail(formData: FormData, request: Request) {
    try {
        // Verify CSRF token
        const formToken = formData.get('csrf');
        const cookieToken = await csrfToken.parse(request.headers.get("Cookie"));

        if (!formToken || !cookieToken || formToken !== cookieToken) {
            return { success: false, error: 'Invalid security token' };
        }

        // Prepare email data
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        const { data, error } = await resend.emails.send({
            from: 'Parth Sinha <parth.sinha@pksinha.co.uk>',
            to: ['sinhaparth555@gmail.com'],
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong>${name} (${email})</p>
                <p><strong>Subject:</strong>${subject}</p>
                <p><strong>Message:</strong>${message}</p>
            ` 
        });

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Email service error:', error);
        return { success: false, error: 'Failed to send email' };
    }
}