import os
import logging
import httpx
from html import escape

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
RESEND_API_URL = "https://api.resend.com/emails"
RESEND_FROM = os.environ.get("RESEND_FROM", "Nolimit Designs <hello@nolimitdesigns.ca>")
RESEND_TO = os.environ.get("CONTACT_FORM_TO", "hello@nolimitdesigns.ca")
CONTACT_REPLY_TO = os.environ.get("CONTACT_REPLY_TO", RESEND_TO)
EMAIL_LOGO_URL = os.environ.get("EMAIL_LOGO_URL", "https://www.nolimitdesigns.ca/nolimit-logo.png")


def detail_row(label: str, value: str) -> str:
    return f"""
        <tr>
            <td style="padding: 14px 0; color: #6b7280; font-size: 13px; width: 150px; vertical-align: top;">{label}</td>
            <td style="padding: 14px 0; color: #111827; font-size: 15px; font-weight: 600; vertical-align: top;">{value}</td>
        </tr>
    """


def email_header(eyebrow: str, title: str, logo_url: str) -> str:
    return f"""
        <div style="background: #fff6ec; border-radius: 18px 18px 0 0; overflow: hidden;">
            <div style="height: 6px; background: #ff4f01; line-height: 6px;">&nbsp;</div>
            <div style="padding: 30px 32px 32px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="vertical-align: middle;">
                            <img src="{escape(logo_url)}" width="154" alt="Nolimit Designs" style="display: block; width: 154px; max-width: 154px; height: auto; border: 0; outline: none; text-decoration: none;">
                        </td>
                        <td style="vertical-align: middle; text-align: right;">
                            <span style="display: inline-block; padding: 7px 11px; border: 1px solid #ffd7bd; border-radius: 999px; color: #ff4f01; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;">{escape(eyebrow)}</span>
                        </td>
                    </tr>
                </table>
                <h1 style="margin: 28px 0 0; color: #101010; font-size: 28px; line-height: 1.2; letter-spacing: 0;">{escape(title)}</h1>
            </div>
        </div>
    """


async def send_resend_email(payload: dict, headers: dict) -> dict:
    async with httpx.AsyncClient() as http_client:
        response = await http_client.post(
            RESEND_API_URL,
            json=payload,
            headers=headers,
            timeout=10.0,
        )

    response_data = response.json() if response.headers.get("content-type", "").startswith("application/json") else response.text
    logger.info(f"Resend API response: status={response.status_code} body={response_data}")

    if response.status_code in (200, 201):
        result = response.json()
        logger.info(f"Email sent successfully via Resend: {result.get('id', 'unknown')}")
        return {"success": True, "email_id": result.get("id")}

    logger.error(f"Resend API error: {response.status_code} - {response_data}")
    raise Exception(f"Failed to send email: status={response.status_code} detail={response_data}")


async def send_contact_email(
    name: str,
    email: str,
    phone: str,
    company: str,
    industry: str,
    selected_package: str,
    budget: str,
    message: str,
    services: str,
) -> dict:
    """Send a contact form submission email via Resend API."""
    if not RESEND_API_KEY:
        logger.error("RESEND_API_KEY is not configured")
        raise ValueError("Email service is not configured")

    safe_name = escape(name)
    safe_email = escape(email)
    safe_phone = escape(phone or "Not provided")
    safe_company = escape(company or "Not provided")
    safe_industry = escape(industry or "Not specified")
    safe_selected_package = escape(selected_package or "Not specified")
    safe_budget = escape(budget or "Not specified")
    safe_services = escape(services or "Not specified")
    safe_message = escape(message)
    safe_reply_to = escape(CONTACT_REPLY_TO)

    internal_html = f"""
    <div style="margin: 0; padding: 0; background: #f4f5f7; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 680px; margin: 0 auto; padding: 34px 18px;">
            {email_header("New Website Inquiry", f"{name} is ready to talk", EMAIL_LOGO_URL)}
            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 18px 18px; padding: 30px; box-shadow: 0 18px 45px rgba(16, 16, 16, .08);">
                <p style="margin: 0 0 22px; color: #374151; font-size: 15px; line-height: 1.7;">A new contact form submission came through the website. The key details are below.</p>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    {detail_row("Name", safe_name)}
                    {detail_row("Email", f'<a href="mailto:{safe_email}" style="color: #ff4f01; text-decoration: none;">{safe_email}</a>')}
                    {detail_row("Phone", safe_phone)}
                    {detail_row("Company", safe_company)}
                    {detail_row("Industry", safe_industry)}
                    {detail_row("Selected Package", safe_selected_package)}
                    {detail_row("Budget", safe_budget)}
                    {detail_row("Services", safe_services)}
                </table>
                <div style="margin-top: 22px; padding: 22px; background: #fff6ec; border: 1px solid #ffd7bd; border-radius: 12px;">
                    <h2 style="margin: 0 0 10px; color: #101010; font-size: 17px;">Project Details</h2>
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">{safe_message}</p>
                </div>
                <div style="margin-top: 22px; padding: 16px 18px; background: #101010; border-radius: 12px;">
                    <p style="margin: 0; color: #ffffff; font-size: 13px; line-height: 1.6;">Reply directly to this email to respond to {safe_name}.</p>
                </div>
            </div>
        </div>
    </div>
    """

    customer_html = f"""
    <div style="margin: 0; padding: 0; background: #f4f5f7; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 640px; margin: 0 auto; padding: 34px 18px;">
            {email_header("Message Received", "We received your message", EMAIL_LOGO_URL)}
            <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 18px 18px; padding: 30px; box-shadow: 0 18px 45px rgba(16, 16, 16, .08);">
                <p style="margin: 0 0 16px; color: #111827; font-size: 16px; line-height: 1.7;">Hi {safe_name},</p>
                <p style="margin: 0 0 18px; color: #374151; font-size: 15px; line-height: 1.7;">Thank you for reaching out to Nolimit Designs. Our team has your project details and will review them shortly. We typically reply within 2 business hours.</p>
                <div style="margin: 22px 0; padding: 22px; background: #fff6ec; border: 1px solid #ffd7bd; border-radius: 12px;">
                    <h2 style="margin: 0 0 12px; color: #101010; font-size: 17px;">Your request summary</h2>
                    <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Selected package:</strong> {safe_selected_package}</p>
                    <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Services:</strong> {safe_services}</p>
                    <p style="margin: 0 0 8px; color: #374151; font-size: 14px;"><strong>Budget:</strong> {safe_budget}</p>
                    <p style="margin: 0; color: #374151; font-size: 14px;"><strong>Message:</strong> {safe_message}</p>
                </div>
                <p style="margin: 0 0 18px; color: #374151; font-size: 15px; line-height: 1.7;">If anything changes before we respond, you can reply to this email or contact us at <a href="mailto:{safe_reply_to}" style="color: #ff4f01; text-decoration: none;">{safe_reply_to}</a>.</p>
                <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #111827; font-size: 15px; line-height: 1.7;">Nolimit Designs<br><span style="color: #6b7280;">Edmonton, AB</span></p>
                </div>
            </div>
        </div>
    </div>
    """

    internal_payload = {
        "from": RESEND_FROM,
        "to": [RESEND_TO],
        "reply_to": email,
        "subject": f"New Inquiry from {name} - {industry or 'General'}",
        "html": internal_html,
    }

    customer_payload = {
        "from": RESEND_FROM,
        "to": [email],
        "reply_to": CONTACT_REPLY_TO,
        "subject": "We received your project inquiry",
        "html": customer_html,
    }

    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    logger.info(f"Sending internal contact email via Resend from={RESEND_FROM} to={RESEND_TO}")
    internal_result = await send_resend_email(internal_payload, headers)

    logger.info(f"Sending customer confirmation email via Resend from={RESEND_FROM} to={email}")
    customer_result = await send_resend_email(customer_payload, headers)

    return {
        "success": True,
        "email_id": internal_result.get("email_id"),
        "customer_email_id": customer_result.get("email_id"),
    }
