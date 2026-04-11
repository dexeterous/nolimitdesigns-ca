import logging
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from dependencies.auth import get_current_user
from schemas.auth import UserResponse
from models.notifications import Notifications
from models.design_requests import Design_requests
from services.notification_service import NotificationService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/notifications", tags=["notifications"])


class NotifyStatusChangeRequest(BaseModel):
    request_id: int
    old_status: str
    new_status: str
    changed_by: str = "System"


class NotifyCommentRequest(BaseModel):
    request_id: int
    commenter_name: str
    comment_preview: str


class NotifyDesignerRequest(BaseModel):
    request_id: int
    designer_name: str


class NotificationPrefsResponse(BaseModel):
    email_status_changes: bool = True
    email_comments: bool = True
    email_assignments: bool = True
    email_files: bool = True
    email_weekly_summary: bool = False


class NotificationPrefsUpdate(BaseModel):
    email_status_changes: Optional[bool] = None
    email_comments: Optional[bool] = None
    email_assignments: Optional[bool] = None
    email_files: Optional[bool] = None
    email_weekly_summary: Optional[bool] = None


# In-memory preferences store (per user) - in production, use a DB table
_user_prefs: dict = {}


@router.get("/preferences", response_model=NotificationPrefsResponse)
async def get_notification_preferences(
    current_user: UserResponse = Depends(get_current_user),
):
    """Get notification preferences for the current user"""
    user_id = current_user.id
    prefs = _user_prefs.get(user_id, {})
    return NotificationPrefsResponse(
        email_status_changes=prefs.get("email_status_changes", True),
        email_comments=prefs.get("email_comments", True),
        email_assignments=prefs.get("email_assignments", True),
        email_files=prefs.get("email_files", True),
        email_weekly_summary=prefs.get("email_weekly_summary", False),
    )


@router.put("/preferences", response_model=NotificationPrefsResponse)
async def update_notification_preferences(
    data: NotificationPrefsUpdate,
    current_user: UserResponse = Depends(get_current_user),
):
    """Update notification preferences for the current user"""
    user_id = current_user.id
    if user_id not in _user_prefs:
        _user_prefs[user_id] = {
            "email_status_changes": True,
            "email_comments": True,
            "email_assignments": True,
            "email_files": True,
            "email_weekly_summary": False,
        }
    update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
    _user_prefs[user_id].update(update_dict)
    prefs = _user_prefs[user_id]
    return NotificationPrefsResponse(**prefs)


@router.post("/notify-status-change")
async def notify_status_change(
    data: NotifyStatusChangeRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create an in-app notification for a status change and simulate email"""
    service = NotificationService(db)
    notif = await service.notify_status_change(
        request_id=data.request_id,
        old_status=data.old_status,
        new_status=data.new_status,
        changed_by=data.changed_by,
    )
    if not notif:
        raise HTTPException(status_code=404, detail="Request not found")

    # Simulate email notification (log it)
    logger.info(
        f"[EMAIL] Status change notification sent for request #{data.request_id}: "
        f"{data.old_status} -> {data.new_status}"
    )

    return {
        "success": True,
        "notification_id": notif.id,
        "email_sent": True,
        "message": f"Notification created and email sent for status change on request #{data.request_id}",
    }


@router.post("/notify-comment")
async def notify_comment(
    data: NotifyCommentRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create an in-app notification for a new comment"""
    service = NotificationService(db)
    notif = await service.notify_comment_added(
        request_id=data.request_id,
        commenter_name=data.commenter_name,
        comment_preview=data.comment_preview,
    )
    if not notif:
        raise HTTPException(status_code=404, detail="Request not found")

    logger.info(
        f"[EMAIL] Comment notification sent for request #{data.request_id} by {data.commenter_name}"
    )

    return {
        "success": True,
        "notification_id": notif.id,
        "email_sent": True,
    }


@router.post("/notify-designer-assigned")
async def notify_designer_assigned(
    data: NotifyDesignerRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create an in-app notification for designer assignment"""
    service = NotificationService(db)
    notif = await service.notify_designer_assigned(
        request_id=data.request_id,
        designer_name=data.designer_name,
    )
    if not notif:
        raise HTTPException(status_code=404, detail="Request not found")

    logger.info(
        f"[EMAIL] Designer assignment notification for request #{data.request_id}: {data.designer_name}"
    )

    return {
        "success": True,
        "notification_id": notif.id,
        "email_sent": True,
    }