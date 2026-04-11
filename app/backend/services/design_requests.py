import logging
from typing import Optional, Dict, Any, List

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from models.design_requests import Design_requests

logger = logging.getLogger(__name__)


# ------------------ Service Layer ------------------
class Design_requestsService:
    """Service layer for Design_requests operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, data: Dict[str, Any], user_id: Optional[str] = None) -> Optional[Design_requests]:
        """Create a new design_requests"""
        try:
            if user_id:
                data['user_id'] = user_id
            obj = Design_requests(**data)
            self.db.add(obj)
            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Created design_requests with id: {obj.id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error creating design_requests: {str(e)}")
            raise

    async def check_ownership(self, obj_id: int, user_id: str) -> bool:
        """Check if user owns this record"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            return obj is not None
        except Exception as e:
            logger.error(f"Error checking ownership for design_requests {obj_id}: {str(e)}")
            return False

    async def get_by_id(self, obj_id: int, user_id: Optional[str] = None) -> Optional[Design_requests]:
        """Get design_requests by ID (user can only see their own records)"""
        try:
            query = select(Design_requests).where(Design_requests.id == obj_id)
            if user_id:
                query = query.where(Design_requests.user_id == user_id)
            result = await self.db.execute(query)
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching design_requests {obj_id}: {str(e)}")
            raise

    async def get_list(
        self, 
        skip: int = 0, 
        limit: int = 20, 
        user_id: Optional[str] = None,
        query_dict: Optional[Dict[str, Any]] = None,
        sort: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Get paginated list of design_requestss (user can only see their own records)"""
        try:
            query = select(Design_requests)
            count_query = select(func.count(Design_requests.id))
            
            if user_id:
                query = query.where(Design_requests.user_id == user_id)
                count_query = count_query.where(Design_requests.user_id == user_id)
            
            if query_dict:
                for field, value in query_dict.items():
                    if hasattr(Design_requests, field):
                        query = query.where(getattr(Design_requests, field) == value)
                        count_query = count_query.where(getattr(Design_requests, field) == value)
            
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
            logger.error(f"Error fetching design_requests list: {str(e)}")
            raise

    async def update(self, obj_id: int, update_data: Dict[str, Any], user_id: Optional[str] = None) -> Optional[Design_requests]:
        """Update design_requests (requires ownership)"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            if not obj:
                logger.warning(f"Design_requests {obj_id} not found for update")
                return None
            for key, value in update_data.items():
                if hasattr(obj, key) and key != 'user_id':
                    setattr(obj, key, value)

            await self.db.commit()
            await self.db.refresh(obj)
            logger.info(f"Updated design_requests {obj_id}")
            return obj
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error updating design_requests {obj_id}: {str(e)}")
            raise

    async def delete(self, obj_id: int, user_id: Optional[str] = None) -> bool:
        """Delete design_requests (requires ownership)"""
        try:
            obj = await self.get_by_id(obj_id, user_id=user_id)
            if not obj:
                logger.warning(f"Design_requests {obj_id} not found for deletion")
                return False
            await self.db.delete(obj)
            await self.db.commit()
            logger.info(f"Deleted design_requests {obj_id}")
            return True
        except Exception as e:
            await self.db.rollback()
            logger.error(f"Error deleting design_requests {obj_id}: {str(e)}")
            raise

    async def get_by_field(self, field_name: str, field_value: Any) -> Optional[Design_requests]:
        """Get design_requests by any field"""
        try:
            if not hasattr(Design_requests, field_name):
                raise ValueError(f"Field {field_name} does not exist on Design_requests")
            result = await self.db.execute(
                select(Design_requests).where(getattr(Design_requests, field_name) == field_value)
            )
            return result.scalar_one_or_none()
        except Exception as e:
            logger.error(f"Error fetching design_requests by {field_name}: {str(e)}")
            raise

    async def list_by_field(
        self, field_name: str, field_value: Any, skip: int = 0, limit: int = 20
    ) -> List[Design_requests]:
        """Get list of design_requestss filtered by field"""
        try:
            if not hasattr(Design_requests, field_name):
                raise ValueError(f"Field {field_name} does not exist on Design_requests")
            result = await self.db.execute(
                select(Design_requests)
                .where(getattr(Design_requests, field_name) == field_value)
                .offset(skip)
                .limit(limit)
                .order_by(Design_requests.id.desc())
            )
            return result.scalars().all()
        except Exception as e:
            logger.error(f"Error fetching design_requestss by {field_name}: {str(e)}")
            raise