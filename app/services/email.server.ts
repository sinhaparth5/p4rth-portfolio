// app/services/email.server.ts
import emailjs from "@emailjs/browser";
import { csrfToken } from "~/utils/security.server";

const EMAIL_CONFIG = {
    serviceId: process.env.VITE_EMAILJS_SERVICE_ID!,
    templateId: process.env.VITE_EMAILJS_TEMPLATE_ID!,
    publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY!,
};

export async function sendEmail(formData: FormData, request: Request) {
    try {
        // Verify CSRF token
        const formToken = formData.get('csrf');
        const cookieToken = await csrfToken.parse(request.headers.get("Cookie"));

        if (!formToken || !cookieToken || formToken !== cookieToken) {
            return { success: false, error: 'Invalid security token' };
        }

        // Prepare email data
        const emailData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const result = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            emailData,
            EMAIL_CONFIG.publicKey,
        );

        return { success: true, data: result };
    } catch (error) {
        console.error('Email service error:', error);
        return { success: false, error: 'Failed to send email' };
    }
}