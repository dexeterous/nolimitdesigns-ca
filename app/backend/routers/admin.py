import logging
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.admin_service import AdminService
from dependencies.auth import get_current_user
from schemas.auth import UserResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/admin", tags=["admin"])


# ---------- Pydantic Schemas ----------
class AdminRequestResponse(BaseModel):
    id: int
    user_id: str
    title: str
    category: str
    brand_name: Optional[str] = None
    priority: str
    status: str
    description: Optional[str] = None
    designer_name: Optional[str] = None
    include_source: Optional[bool] = None
    due_date: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AdminRequestListResponse(BaseModel):
    items: List[AdminRequestResponse]
    total: int
    skip: int
    limit: int


class AdminUpdateRequest(BaseModel):
    status: Optional[str] = None
    designer_name: Optional[str] = None
    priority: Optional[str] = None
    title: Optional[str] = None
    category: Optional[str] = None
    brand_name: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[str] = None


class DesignerWorkload(BaseModel):
    name: str
    active: int


class AdminStatsResponse(BaseModel):
    total_active: int
    queued: int
    completed_today: int
    total_all: int
    designer_workload: List[DesignerWorkload]


# ---------- Routes ----------
@router.get("/requests", response_model=AdminRequestListResponse)
async def get_all_requests(
    search: Optional[str] = Query(None, description="Search by title"),
    status: Optional[str] = Query(None, description="Filter by status"),
    designer: Optional[str] = Query(None, description="Filter by designer"),
    sort: Optional[str] = Query(None, description="Sort field"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get all design requests (admin endpoint)"""
    service = AdminService(db)
    try:
        result = await service.get_all_requests(
            skip=skip,
            limit=limit,
            search=search,
            status=status,
            designer=designer,
            sort=sort,
        )
        return result
    except Exception as e:
        logger.error(f"Error in admin get requests: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/requests/{request_id}", response_model=AdminRequestResponse)
async def update_request(
    request_id: int,
    data: AdminUpdateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update any design request (admin endpoint)"""
    service = AdminService(db)
    try:
        update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
        result = await service.update_request_admin(request_id, update_dict)
        if not result:
            raise HTTPException(status_code=404, detail="Request not found")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in admin update request: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stats", response_model=AdminStatsResponse)
async def get_stats(
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get admin dashboard statistics"""
    service = AdminService(db)
    try:
        return await service.get_stats()
    except Exception as e:
        logger.error(f"Error in admin stats: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))