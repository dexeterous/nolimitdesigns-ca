import logging
from typing import Optional, Dict, Any, List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.status_history import Status_history

logger = logging.getLogger(__name__)


# ------------------ Service Layer ------------------
class Status_historyService:
    """Service layer for Status_history operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, data: Dict[str, Any], user_id: Optional[str] = None) -> Optional[Status_history]:
        """Create a new status_history"""
        try:
            if user_id:
                data['user_id'] = user_id
            obj = Status_history(**data)
            self.db.add(obj)
            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Created status_history with id: {obj.id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error creating status_history: {str(e)}")
            raise

    async def check_ownership(self, obj_id: int, user_id: str) -> bool:
        """Check if user owns this record"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            return obj is not None
        except Exception as e:
            logger.error(f"Error checking ownership for status_history {obj_id}: {str(e)}")
            return False

    async def get_by_id(self, obj_id: int, user_id: Optional[str] = None) -> Optional[Status_history]:
        """Get status_history by ID (user can only see their own records)"""
        try:
            query = select(Status_history).where(Status_history.id == obj_id)
            if user_id:
                query = query.where(Status_history.user_id == user_id)
            result = await self.db.execute(query)
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching status_history {obj_id}: {str(e)}")
            raise

    async def get_list(
        self, 
        skip: int = 0, 
        limit: int = 20, 
        user_id: Optional[str] = None,
        query_dict: Optional[Dict[str, Any]] = None,
        sort: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get paginated list of status_historys (user can only see their own records)"""
        try:
            query = select(Status_history)
            count_query = select(func.count(Status_history.id))
            
            if user_id:
                query = query.where(Status_history.user_id == user_id)
                count_query = count_query.where(Status_history.user_id == user_id)
            
            if query_dict:
                for field, value in query_dict.items():
                    if hasattr(Status_history, field):
                        query = query.where(getattr(Status_history, field) == value)
                        count_query = count_query.where(getattr(Status_history, field) == value)
            
            count_result = await self.db.execute(count_query)
            total = count_result.scalar()

            if sort:
                if sort.startswith('-'):
                    field_name = sort[1:]
                    if hasattr(Status_history, field_name):
                        query = query.order_by(getattr(Status_history, field_name).desc())
                else:
                    if hasattr(Status_history, sort):
                        query = query.order_by(getattr(Status_history, sort))
            else:
                query = query.order_by(Status_history.id.desc())

            result = await self.db.execute(query.offset(skip).limit(limit))
            items = result.scalars().all()

            return {
                "items": items,
                "total": total,
                "skip": skip,
                "limit": limit,
            }
        except Exception as e:
            logger.error(f"Error fetching status_history list: {str(e)}")
            raise

    async def update(self, obj_id: int, update_data: Dict[str, Any], user_id: Optional[str] = None) -> Optional[Status_history]:
        """Update status_history (requires ownership)"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            if not obj:
                logger.warning(f"Status_history {obj_id} not found for update")
                return None
            for key, value in update_data.items():
                if hasattr(obj, key) and key != 'user_id':
                    setattr(obj, key, value)

            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Updated status_history {obj_id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error updating status_history {obj_id}: {str(e)}")
            raise

    async def delete(self, obj_id: int, user_id: Optional[str] = None) -> bool:
        """Delete status_history (requires ownership)"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            if not obj:
                logger.warning(f"Status_history {obj_id} not found for deletion")
                return False
            await self.db.delete(obj)
            await self.db.commit()
            logger.info(f"Deleted status_history {obj_id}")
            return True
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error deleting status_history {obj_id}: {str(e)}")
            raise

    async def get_by_field(self, field_name: str, field_value: Any) -> Optional[Status_history]:
        """Get status_history by any field"""
        try:
            if not hasattr(Status_history, field_name):
                raise ValueError(f"Field {field_name} does not exist on Status_history")
            result = await self.db.execute(
                select(Status_history).where(getattr(Status_history, field_name) == field_value)
            )
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching status_history by {field_name}: {str(e)}")
            raise

    async def list_by_field(
        self, field_name: str, field_value: Any, skip: int = 0, limit: int = 20
    ) -> List[Status_history]:
        """Get list of status_historys filtered by field"""
        try:
            if not hasattr(Status_history, field_name):
                raise ValueError(f"Field {field_name} does not exist on Status_history")
            result = await self.db.execute(
                select(Status_history)
                .where(getattr(Status_history, field_name) == field_value)
                .offset(skip)
                .limit(limit)
                .order_by(Status_history.id.desc())
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error fetching status_historys by {field_name}: {str(e)}")
            raise