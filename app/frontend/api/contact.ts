const RESEND_API_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Nolimit Designs <hello@nolimitdesigns.ca>";
const DEFAULT_TO = "hello@nolimitdesigns.ca";

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
    const budget = String(data.budget || "").trim();
    const services = Array.isArray(data.services) ? data.services.join(", ") : String(data.services || "").trim();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background: #ff4f01; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
          <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
          <p><strong>Industry:</strong> ${escapeHtml(industry || "Not specified")}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budget || "Not specified")}</p>
          <p><strong>Services:</strong> ${escapeHtml(services || "Not specified")}</p>
          <div style="margin-top: 20px; padding: 16px; background: #fff6ec; border-left: 4px solid #ff4f01;">
            <h2 style="font-size: 18px; margin: 0 0 8px 0;">Project Details</h2>
            <p style="white-space: pre-wrap; line-height: 1.6; margin: 0;">${escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;

    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_FORM_TO || DEFAULT_TO],
        reply_to: email,
        subject: `New Inquiry from ${name}${industry ? ` - ${industry}` : ""}`,
        html,
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      return res.status(response.status).json({
        error: result?.message || "Failed to send contact email",
      });
    }

    return res.status(200).json({ success: true, id: result.id || "" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Unable to send contact message" });
  }
}
