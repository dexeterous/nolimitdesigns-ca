import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.resend_email import send_contact_email

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/email", tags=["email"])


class ContactEmailRequest(BaseModel):
    name: str
    email: str
    phone: str = ""
    company: str = ""
    industry: str = ""
    budget: str = ""
    message: str
    services: str = ""


class ContactEmailResponse(BaseModel):
    success: bool
    email_id: str = ""
    message: str = ""


@router.post("/send-contact", response_model=ContactEmailResponse)
async def send_contact_form_email(data: ContactEmailRequest):
    """Send contact form submission via Resend email API."""
    try:
        result = await send_contact_email(
            name=data.name,
            email=data.email,
            phone=data.phone,
            company=data.company,
            industry=data.industry,
            budget=data.budget,
            message=data.message,
            services=data.services,
        )
        return ContactEmailResponse(
            success=True,
            email_id=result.get("email_id", ""),
            message="Email sent successfully",
        )
    except ValueError as e:
        logger.error(f"Configuration error: {e}")
        raise HTTPException(status_code=500, detail="Email service is not configured")
    except Exception as e:
        logger.error(f"Email sending error: {e}")
        raise HTTPException(status_code=500, detail=str(e))