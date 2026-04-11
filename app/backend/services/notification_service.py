import logging
from datetime import datetime
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from models.notifications import Notifications
from models.design_requests import Design_requests

logger = logging.getLogger(__name__)


class NotificationService:
    """Service for creating and managing notifications"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_notification(
        self,
        user_id: str,
        title: str,
        message: str,
        notif_type: str = "status_change",
        request_id: Optional[int] = None,
    ) -> Notifications:
        """Create a new notification for a user"""
        notif = Notifications(
            user_id=user_id,
            title=title,
            message=message,
            type=notif_type,
            request_id=request_id,
            is_read=False,
            created_at=datetime.now(),
        )
        self.db.add(notif)
        await self.db.commit()
        await self.db.refresh(notif)
        return notif

    async def notify_status_change(
        self,
        request_id: int,
        old_status: str,
        new_status: str,
        changed_by: str = "System",
    ) -> Optional[Notifications]:
        """Create notification when a request status changes"""
        # Get the request to find the owner
        stmt = select(Design_requests).where(Design_requests.id == request_id)
        result = await self.db.execute(stmt)
        request = result.scalar_one_or_none()
        if not request:
            return None

        title = f"Request Updated: {request.title}"
        message = f'Status changed from "{old_status}" to "{new_status}" by {changed_by}.'

        return await self.create_notification(
            user_id=request.user_id,
            title=title,
            message=message,
            notif_type="status_change",
            request_id=request_id,
        )

    async def notify_comment_added(
        self,
        request_id: int,
        commenter_name: str,
        comment_preview: str,
    ) -> Optional[Notifications]:
        """Create notification when a comment is added"""
        stmt = select(Design_requests).where(Design_requests.id == request_id)
        result = await self.db.execute(stmt)
        request = result.scalar_one_or_none()
        if not request:
            return None

        title = f"New Comment on: {request.title}"
        preview = comment_preview[:100] + "..." if len(comment_preview) > 100 else comment_preview
        message = f'{commenter_name} commented: "{preview}"'

        return await self.create_notification(
            user_id=request.user_id,
            title=title,
            message=message,
            notif_type="comment",
            request_id=request_id,
        )

    async def notify_designer_assigned(
        self,
        request_id: int,
        designer_name: str,
    ) -> Optional[Notifications]:
        """Create notification when a designer is assigned"""
        stmt = select(Design_requests).where(Design_requests.id == request_id)
        result = await self.db.execute(stmt)
        request = result.scalar_one_or_none()
        if not request:
            return None

        title = f"Designer Assigned: {request.title}"
        message = f'{designer_name} has been assigned to your request "{request.title}".'

        return await self.create_notification(
            user_id=request.user_id,
            title=title,
            message=message,
            notif_type="assignment",
            request_id=request_id,
        )

    async def notify_file_uploaded(
        self,
        request_id: int,
        file_name: str,
        uploaded_by: str,
    ) -> Optional[Notifications]:
        """Create notification when a file is uploaded"""
        stmt = select(Design_requests).where(Design_requests.id == request_id)
        result = await self.db.execute(stmt)
        request = result.scalar_one_or_none()
        if not request:
            return None

        title = f"New File: {request.title}"
        message = f'{uploaded_by} uploaded "{file_name}" to your request.'

        return await self.create_notification(
            user_id=request.user_id,
            title=title,
            message=message,
            notif_type="file",
            request_id=request_id,
        )