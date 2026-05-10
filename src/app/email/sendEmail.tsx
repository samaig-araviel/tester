'use server';

import {Resend} from 'resend';

export async function sendEmail(coachEmail: string) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(apiKey);

    return await resend.emails.send({
        from: 'hello@parentfits.com',
        to: coachEmail,
        subject: 'Testing Parents Fits',
        html: '<p>Testing sending coach email <strong>first email</strong>!</p>',
    });
}