import os
import logging
import httpx

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
RESEND_API_URL = "https://api.resend.com/emails"


async def send_contact_email(
    name: str,
    email: str,
    phone: str,
    company: str,
    industry: str,
    budget: str,
    message: str,
    services: str,
) -> dict:
    """Send a contact form submission email via Resend API."""
    if not RESEND_API_KEY:
        logger.error("RESEND_API_KEY is not configured")
        raise ValueError("Email service is not configured")

    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ff4f01; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="background: #ffffff; padding: 24px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333; width: 140px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;"><a href="mailto:{email}" style="color: #ff4f01;">{email}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{phone or 'Not provided'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Company</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{company or 'Not provided'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Industry</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{industry or 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Budget</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{budget or 'Not specified'}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #333;">Services</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #555;">{services or 'Not specified'}</td>
                </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px;">Project Details</h3>
                <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">{message}</p>
            </div>
            <div style="margin-top: 20px; padding: 12px; background: #fff6ec; border-radius: 8px; border-left: 4px solid #ff4f01;">
                <p style="margin: 0; color: #666; font-size: 13px;">Reply directly to this email to respond to <strong>{name}</strong> at <a href="mailto:{email}" style="color: #ff4f01;">{email}</a></p>
            </div>
        </div>
    </div>
    """

    payload = {
        "from": "Nolimit Designs <onboarding@resend.dev>",
        "to": ["hello@nolimitdesigns.com"],
        "reply_to": email,
        "subject": f"New Inquiry from {name} - {industry or 'General'}",
        "html": html_body,
    }

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as http_client:
        response = await http_client.post(
            RESEND_API_URL,
            json=payload,
            headers=headers,
            timeout=10.0,
        )

    if response.status_code in (200, 201):
        result = response.json()
        logger.info(f"Email sent successfully via Resend: {result.get('id', 'unknown')}")
        return {"success": True, "email_id": result.get("id")}
    else:
        logger.error(f"Resend API error: {response.status_code} - {response.text}")
        raise Exception(f"Failed to send email: {response.status_code}")