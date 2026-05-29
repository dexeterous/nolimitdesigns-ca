const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Nolimit Designs <hello@nolimitdesigns.ca>";
const DEFAULT_TO = "hello@nolimitdesigns.ca";
const DEFAULT_REPLY_TO = "hello@nolimitdesigns.ca";
const DEFAULT_LOGO_URL = "https://www.nolimitdesigns.ca/nolimit-logo.png";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeBody(body: unknown) {
  if (typeof body === "string") {
    return JSON.parse(body);
  }

  return body || {};
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 14px 0; color: #6b7280; font-size: 13px; width: 150px; vertical-align: top;">${label}</td>
      <td style="padding: 14px 0; color: #111827; font-size: 15px; font-weight: 600; vertical-align: top;">${value}</td>
    </tr>
  `;
}

function emailHeader(eyebrow: string, title: string, logoUrl: string) {
  return `
    <div style="background: #fff6ec; border-radius: 18px 18px 0 0; overflow: hidden;">
      <div style="height: 6px; background: #ff4f01; line-height: 6px;">&nbsp;</div>
      <div style="padding: 30px 32px 32px;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: middle;">
              <img src="${escapeHtml(logoUrl)}" width="154" alt="Nolimit Designs" style="display: block; width: 154px; max-width: 154px; height: auto; border: 0; outline: none; text-decoration: none;">
            </td>
            <td style="vertical-align: middle; text-align: right;">
              <span style="display: inline-block; padding: 7px 11px; border: 1px solid #ffd7bd; border-radius: 999px; color: #ff4f01; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;">${escapeHtml(eyebrow)}</span>
            </td>
          </tr>
        </table>
        <h1 style="margin: 28px 0 0; color: #101010; font-size: 28px; line-height: 1.2; letter-spacing: 0;">${escapeHtml(title)}</h1>
      </div>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Email service is not configured" });
  }

  try {
    const data = normalizeBody(req.body);
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const phone = String(data.phone || "").trim();
    const company = String(data.company || "").trim();
    const industry = String(data.industry || "").trim();
    const selectedPackage = String(data.selectedPackage || "").trim();
    const budget = String(data.budget || "").trim();
    const services = Array.isArray(data.services) ? data.services.join(", ") : String(data.services || "").trim();
    const sender = process.env.RESEND_FROM || DEFAULT_FROM;
    const businessEmail = process.env.CONTACT_FORM_TO || DEFAULT_TO;
    const replyTo = process.env.CONTACT_REPLY_TO || businessEmail || DEFAULT_REPLY_TO;
    const logoUrl = process.env.EMAIL_LOGO_URL || DEFAULT_LOGO_URL;

    const internalHtml = `
      <div style="margin: 0; padding: 0; background: #f4f5f7; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 680px; margin: 0 auto; padding: 34px 18px;">
          ${emailHeader("New Website Inquiry", `${name} is ready to talk`, logoUrl)}
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 18px 18px; padding: 30px; box-shadow: 0 18px 45px rgba(16, 16, 16, .08);">
            <p style="margin: 0 0 22px; color: #374151; font-size: 15px; line-height: 1.7;">A new contact form submission came through the website. The key details are below.</p>
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              ${detailRow("Name", escapeHtml(name))}
              ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" style="color: #ff4f01; text-decoration: none;">${escapeHtml(email)}</a>`)}
              ${detailRow("Phone", escapeHtml(phone || "Not provided"))}
              ${detailRow("Company", escapeHtml(company || "Not provided"))}
              ${detailRow("Industry", escapeHtml(industry || "Not specified"))}
              ${detailRow("Selected Package", escapeHtml(selectedPackage || "Not specified"))}
              ${detailRow("Budget", escapeHtml(budget || "Not specified"))}
              ${detailRow("Services", escapeHtml(services || "Not specified"))}
            </table>
            <div style="margin-top: 22px; padding: 22px; background: #fff6ec; border: 1px solid #ffd7bd; border-radius: 12px;">
              <h2 style="margin: 0 0 10px; color: #101010; font-size: 17px;">Project Details</h2>
              <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            <div style="margin-top: 22px; padding: 16px 18px; background: #101010; border-radius: 12px;">
              <p style="margin: 0; color: #ffffff; font-size: 13px; line-height: 1.6;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="margin: 0; padding: 0; background: #f4f5f7; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 640px; margin: 0 auto; padding: 34px 18px;">
          ${emailHeader("Message Received", "We received your message", logoUrl)}
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 18px 18px; padding: 30px; box-shadow: 0 18px 45px rgba(16, 16, 16, .08);">
            <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 1.7;">Hi ${escapeHtml(name)},</p>
            <p style="margin: 0 0 18px; color: #374151; font-size: 15px; line-height: 1.7;">Thank you for reaching out to Nolimit Designs. Our team has your project details and will review them shortly. We typically reply within 2 business hours.</p>
            <div style="margin: 22px 0; padding: 22px; background: #fff6ec; border: 1px solid #ffd7bd; border-radius: 12px;">
              <h2 style="margin: 0 0 12px; color: #101010; font-size: 17px;">Your request summary</h2>
              <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Selected package:</strong> ${escapeHtml(selectedPackage || "Not specified")}</p>
              <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Services:</strong> ${escapeHtml(services || "Not specified")}</p>
              <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Budget:</strong> ${escapeHtml(budget || "Not specified")}</p>
              <p style="margin: 0; color: #374151; font-size: 14px;"><strong>Message:</strong> ${escapeHtml(message)}</p>
            </div>
            <p style="margin: 0 0 18px; color: #374151; font-size: 15px; line-height: 1.7;">If anything changes before we respond, you can reply to this email or contact us at <a href="mailto:${escapeHtml(replyTo)}" style="color: #ff4f01; text-decoration: none;">${escapeHtml(replyTo)}</a>.</p>
            <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #111827; font-size: 15px; line-height: 1.7;">Nolimit Designs<br><span style="color: #6b7280;">Edmonton, AB</span></p>
            </div>
          </div>
        </div>
      </div>
    `;

    const sendEmail = async (payload: Record<string, unknown>) => fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const internalResponse = await sendEmail({
      from: sender,
      to: [businessEmail],
      reply_to: email,
      subject: `New Inquiry from ${name}${industry ? ` - ${industry}` : ""}`,
      html: internalHtml,
    });

    const internalResult = await internalResponse.json().catch(() => ({}));
    if (!internalResponse.ok) {
      return res.status(internalResponse.status).json({
        error: internalResult?.message || "Failed to send contact email",
      });
    }

    const customerResponse = await sendEmail({
      from: sender,
      to: [email],
      reply_to: replyTo,
      subject: "We received your project inquiry",
      html: customerHtml,
    });

    const customerResult = await customerResponse.json().catch(() => ({}));
    if (!customerResponse.ok) {
      return res.status(customerResponse.status).json({
        error: customerResult?.message || "Failed to send customer confirmation email",
      });
    }

    return res.status(200).json({
      success: true,
      id: internalResult.id || "",
      customerEmailId: customerResult.id || "",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Unable to send contact message" });
  }
}
