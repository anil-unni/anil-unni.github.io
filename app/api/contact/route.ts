import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, string>;

  if (!name?.trim() || !EMAIL_RE.test(email) || !subject?.trim() || message?.trim().length < 10) {
    return NextResponse.json({ message: "Invalid form data" }, { status: 422 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: siteConfig.smtp.fromAddress,
      to: siteConfig.smtp.toAddress,
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p style="white-space:pre-wrap">${message}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to send email. Please try again." }, { status: 500 });
  }
}
