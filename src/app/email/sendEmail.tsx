'use server';

import {Resend} from 'resend';

export interface RegistrationEmailPayload {
    coach: {
        name: string;
        email: string;
    };
    parent: {
        firstName: string;
        lastName: string;
        email: string;
        jobTitle: string;
    };
    leave: {
        type: string;
        stage: string;
        startDate: string;
        returnDate: string;
    };
    sessionFormat: string;
    preparation: string;
}

export async function sendEmail(payload: RegistrationEmailPayload) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(apiKey);
    const {coach, parent} = payload;

    return await resend.emails.send({
        from: 'hello@parentfits.com',
        to: coach.email,
        replyTo: parent.email,
        subject: `New parental leave registration — ${parent.firstName} ${parent.lastName}`,
        html: renderRegistrationEmail(payload),
    });
}

const COLORS = {
    pageBg: '#F5F1E8',
    surface: '#FFFFFF',
    border: '#E8E4DE',
    teal: '#14827C',
    navy: '#0B4F4F',
    charcoal: '#1C1C1C',
    muted: '#6F6F6F',
} as const;

const FONT_HEADING = `Georgia, "Times New Roman", serif`;
const FONT_BODY = `"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function detailRow(label: string, value: string): string {
    return `
        <tr>
            <td style="padding:10px 0;font-family:${FONT_BODY};font-size:13px;color:${COLORS.muted};width:160px;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:10px 0;font-family:${FONT_BODY};font-size:14px;font-weight:500;color:${COLORS.charcoal};vertical-align:top;">${escapeHtml(value)}</td>
        </tr>
    `;
}

function section(eyebrow: string, rows: string[]): string {
    return `
        <p style="margin:0 0 6px 0;font-family:${FONT_BODY};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.muted};">${escapeHtml(eyebrow)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
            ${rows.join('')}
        </table>
    `;
}

function divider(): string {
    return `<hr style="border:none;border-top:1px solid ${COLORS.border};margin:28px 0;">`;
}

function renderRegistrationEmail(payload: RegistrationEmailPayload): string {
    const {coach, parent, leave, sessionFormat, preparation} = payload;
    const fullName = `${parent.firstName} ${parent.lastName}`.trim();

    const aboutRows = [
        detailRow('Name', fullName),
        detailRow('Work email', parent.email),
        parent.jobTitle ? detailRow('Job title', parent.jobTitle) : '',
    ].filter(Boolean);

    const leaveRows = [
        detailRow('Leave type', leave.type),
        detailRow('Stage', leave.stage),
        leave.startDate ? detailRow('Leave start', leave.startDate) : '',
        leave.returnDate ? detailRow('Expected return', leave.returnDate) : '',
        detailRow('Session format', sessionFormat),
    ].filter(Boolean);

    const preparationBlock = preparation
        ? `
            ${divider()}
            <p style="margin:0 0 10px 0;font-family:${FONT_BODY};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.muted};">Anything they'd like you to know</p>
            <p style="margin:0;padding:16px 18px;background-color:${COLORS.pageBg};border-left:2px solid ${COLORS.teal};font-family:${FONT_BODY};font-size:14px;line-height:1.65;color:${COLORS.charcoal};white-space:pre-wrap;">${escapeHtml(preparation)}</p>
        `
        : '';

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New parental leave registration</title>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.pageBg};font-family:${FONT_BODY};color:${COLORS.charcoal};">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COLORS.pageBg};padding:32px 16px;">
    <tr>
        <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
                <tr>
                    <td style="padding:0 4px 18px 4px;">
                        <p style="margin:0;font-family:${FONT_HEADING};font-size:18px;font-weight:700;color:${COLORS.navy};letter-spacing:-0.01em;">Parent Fits</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color:${COLORS.surface};border:1px solid ${COLORS.border};border-radius:12px;padding:40px;">
                        <p style="margin:0;font-family:${FONT_BODY};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${COLORS.teal};">New registration</p>
                        <h1 style="margin:14px 0 0 0;font-family:${FONT_HEADING};font-size:26px;line-height:1.2;font-weight:700;color:${COLORS.navy};">A new parent has chosen you as their coach.</h1>
                        <p style="margin:18px 0 0 0;font-family:${FONT_BODY};font-size:15px;line-height:1.65;color:${COLORS.charcoal};">Hi ${escapeHtml(coach.name)}, ${escapeHtml(fullName || 'a new parent')} just registered for parental leave coaching and would like to work with you. Their details are below — please reach out within two working days to arrange a session.</p>

                        ${divider()}
                        ${section('About them', aboutRows)}

                        ${divider()}
                        ${section('Their leave', leaveRows)}

                        ${preparationBlock}

                        ${divider()}
                        <p style="margin:0;font-family:${FONT_BODY};font-size:13px;line-height:1.6;color:${COLORS.muted};">Reply to this email to reach ${escapeHtml(parent.firstName || 'them')} directly — your reply will go to <span style="color:${COLORS.charcoal};">${escapeHtml(parent.email)}</span>.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding:20px 4px 0 4px;">
                        <p style="margin:0;font-family:${FONT_BODY};font-size:12px;line-height:1.6;color:${COLORS.muted};">Sent automatically by Parent Fits when a parent completes their registration.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`;
}
