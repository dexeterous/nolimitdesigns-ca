import logging
from typing import Optional, Dict, Any
from datetime import datetime, timedelta

from sqlalchemy import select, func, case, and_
from sqlalchemy.ext.asyncio import AsyncSession

from models.design_requests import Design_requests

logger = logging.getLogger(__name__)


class AdminService:
    """Service layer for admin operations across all users"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_requests(
        self,
        skip: int = 0,
        limit: int = 50,
        search: Optional[str] = None,
        status: Optional[str] = None,
        designer: Optional[str] = None,
        sort: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get all design requests across all users with filters"""
        try:
            query = select(Design_requests)
            count_query = select(func.count(Design_requests.id))

            if search:
                search_filter = Design_requests.title.ilike(f"%{search}%")
                query = query.where(search_filter)
                count_query = count_query.where(search_filter)

            if status and status != "All Statuses":
                query = query.where(Design_requests.status == status)
                count_query = count_query.where(Design_requests.status == status)

            if designer and designer != "All Designers":
                query = query.where(Design_requests.designer_name == designer)
                count_query = count_query.where(Design_requests.designer_name == designer)

            count_result = await self.db.execute(count_query)
            total = count_result.scalar()

            if sort:
                if sort.startswith('-'):
                    field_name = sort[1:]
                    if hasattr(Design_requests, field_name):
                        query = query.order_by(getattr(Design_requests, field_name).desc())
                else:
                    if hasattr(Design_requests, sort):
                        query = query.order_by(getattr(Design_requests, sort))
            else:
                query = query.order_by(Design_requests.id.desc())

            result = await self.db.execute(query.offset(skip).limit(limit))
            items = result.scalars().all()

            return {
                "items": items,
                "total": total,
                "skip": skip,
                "limit": limit,
            }
        except Exception as e:
            logger.error(f"Error fetching all requests: {str(e)}")
            raise

    async def update_request_admin(
        self, request_id: int, update_data: Dict[str, Any]
    ) -> Optional[Design_requests]:
        """Update any design request (admin - no ownership check)"""
        try:
            result = await self.db.execute(
                select(Design_requests).where(Design_requests.id == request_id)
            )
            obj = result.scalar_one_or_none()
            if not obj:
                return None

            for key, value in update_data.items():
                if hasattr(obj, key) and key not in ('id', 'user_id'):
                    setattr(obj, key, value)

            obj.updated_at = datetime.now()
            await self.db.commit()
            await self.db.refresh(obj)
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error updating request {request_id}: {str(e)}")
            raise

    async def get_stats(self) -> Dict[str, Any]:
        """Get admin dashboard statistics"""
        try:
            # Total active (non-completed)
            active_result = await self.db.execute(
                select(func.count(Design_requests.id)).where(
                    Design_requests.status != "Completed"
                )
            )
            total_active = active_result.scalar() or 0

            # Queued
            queued_result = await self.db.execute(
                select(func.count(Design_requests.id)).where(
                    Design_requests.status == "Queue"
                )
            )
            queued = queued_result.scalar() or 0

            # Completed today
            today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
            completed_today_result = await self.db.execute(
                select(func.count(Design_requests.id)).where(
                    and_(
                        Design_requests.status == "Completed",
                        Design_requests.updated_at >= today_start
                    )
                )
            )
            completed_today = completed_today_result.scalar() or 0

            # Total requests
            total_result = await self.db.execute(
                select(func.count(Design_requests.id))
            )
            total_all = total_result.scalar() or 0

            # Designer workload
            designer_query = await self.db.execute(
                select(
                    Design_requests.designer_name,
                    func.count(Design_requests.id).label("active_count")
                ).where(
                    Design_requests.status != "Completed"
                ).group_by(Design_requests.designer_name)
            )
            designer_workload = [
                {"name": row[0] or "Unassigned", "active": row[1]}
                for row in designer_query.all()
            ]

            return {
                "total_active": total_active,
                "queued": queued,
                "completed_today": completed_today,
                "total_all": total_all,
                "designer_workload": designer_workload,
            }
        except Exception as e:
            logger.error(f"Error getting stats: {str(e)}")
            raise