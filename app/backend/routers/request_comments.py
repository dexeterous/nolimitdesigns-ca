import json
import logging
from typing import List, Optional

from datetime import datetime, date

from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.request_comments import Request_commentsService
from dependencies.auth import get_current_user
from schemas.auth import UserResponse

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/entities/request_comments", tags=["request_comments"])


# ---------- Pydantic Schemas ----------
class Request_commentsData(BaseModel):
    """Entity data schema (for create/update)"""
    request_id: int
    content: str
    author_name: Optional[str] = None
    created_at: Optional[datetime] = None


class Request_commentsUpdateData(BaseModel):
    """Update entity data (partial updates allowed)"""
    request_id: Optional[int] = None
    content: Optional[str] = None
    author_name: Optional[str] = None
    created_at: Optional[datetime] = None


class Request_commentsResponse(BaseModel):
    """Entity response schema"""
    id: int
    user_id: str
    request_id: int
    content: str
    author_name: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Request_commentsListResponse(BaseModel):
    """List response schema"""
    items: List[Request_commentsResponse]
    total: int
    skip: int
    limit: int


class Request_commentsBatchCreateRequest(BaseModel):
    """Batch create request"""
    items: List[Request_commentsData]


class Request_commentsBatchUpdateItem(BaseModel):
    """Batch update item"""
    id: int
    updates: Request_commentsUpdateData


class Request_commentsBatchUpdateRequest(BaseModel):
    """Batch update request"""
    items: List[Request_commentsBatchUpdateItem]


class Request_commentsBatchDeleteRequest(BaseModel):
    """Batch delete request"""
    ids: List[int]


# ---------- Routes ----------
@router.get("", response_model=Request_commentsListResponse)
async def query_request_commentss(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Query request_commentss with filtering, sorting, and pagination (user can only see their own records)"""
    logger.debug(f"Querying request_commentss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")
    
    service = Request_commentsService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")
        
        result = await service.get_list(
            skip=skip, 
            limit=limit,
            query_dict=query_dict,
            sort=sort,
            user_id=str(current_user.id),
        )
        logger.debug(f"Found {result['total']} request_commentss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying request_commentss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/all", response_model=Request_commentsListResponse)
async def query_request_commentss_all(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    # Query request_commentss with filtering, sorting, and pagination without user limitation
    logger.debug(f"Querying request_commentss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")

    service = Request_commentsService(db)
    try:
        # Parse query JSON if provided
        query_dict = None
        if query:
            try:
                query_dict = json.loads(query)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid query JSON format")

        result = await service.get_list(
            skip=skip,
            limit=limit,
            query_dict=query_dict,
            sort=sort
        )
        logger.debug(f"Found {result['total']} request_commentss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying request_commentss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/{id}", response_model=Request_commentsResponse)
async def get_request_comments(
    id: int,
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a single request_comments by ID (user can only see their own records)"""
    logger.debug(f"Fetching request_comments with id: {id}, fields={fields}")
    
    service = Request_commentsService(db)
    try:
        result = await service.get_by_id(id, user_id=str(current_user.id))
        if not result:
            logger.warning(f"Request_comments with id {id} not found")
            raise HTTPException(status_code=404, detail="Request_comments not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching request_comments {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("", response_model=Request_commentsResponse, status_code=201)
async def create_request_comments(
    data: Request_commentsData,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new request_comments"""
    logger.debug(f"Creating new request_comments with data: {data}")
    
    service = Request_commentsService(db)
    try:
        result = await service.create(data.model_dump(), user_id=str(current_user.id))
        if not result:
            raise HTTPException(status_code=400, detail="Failed to create request_comments")
        
        logger.info(f"Request_comments created successfully with id: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error creating request_comments: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating request_comments: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/batch", response_model=List[Request_commentsResponse], status_code=201)
async def create_request_commentss_batch(
    request: Request_commentsBatchCreateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create multiple request_commentss in a single request"""
    logger.debug(f"Batch creating {len(request.items)} request_commentss")
    
    service = Request_commentsService(db)
    results = []
    
    try:
        for item_data in request.items:
            result = await service.create(item_data.model_dump(), user_id=str(current_user.id))
            if result:
                results.append(result)
        
        logger.info(f"Batch created {len(results)} request_commentss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch create: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch create failed: {str(e)}")


@router.put("/batch", response_model=List[Request_commentsResponse])
async def update_request_commentss_batch(
    request: Request_commentsBatchUpdateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update multiple request_commentss in a single request (requires ownership)"""
    logger.debug(f"Batch updating {len(request.items)} request_commentss")
    
    service = Request_commentsService(db)
    results = []
    
    try:
        for item in request.items:
            # Only include non-None values for partial updates
            update_dict = {k: v for k, v in item.updates.model_dump().items() if v is not None}
            result = await service.update(item.id, update_dict, user_id=str(current_user.id))
            if result:
                results.append(result)
        
        logger.info(f"Batch updated {len(results)} request_commentss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch update: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch update failed: {str(e)}")


@router.put("/{id}", response_model=Request_commentsResponse)
async def update_request_comments(
    id: int,
    data: Request_commentsUpdateData,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update an existing request_comments (requires ownership)"""
    logger.debug(f"Updating request_comments {id} with data: {data}")

    service = Request_commentsService(db)
    try:
        # Only include non-None values for partial updates
        update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
        result = await service.update(id, update_dict, user_id=str(current_user.id))
        if not result:
            logger.warning(f"Request_comments with id {id} not found for update")
            raise HTTPException(status_code=404, detail="Request_comments not found")
        
        logger.info(f"Request_comments {id} updated successfully")
        return result
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error updating request_comments {id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating request_comments {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.delete("/batch")
async def delete_request_commentss_batch(
    request: Request_commentsBatchDeleteRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete multiple request_commentss by their IDs (requires ownership)"""
    logger.debug(f"Batch deleting {len(request.ids)} request_commentss")
    
    service = Request_commentsService(db)
    deleted_count = 0
    
    try:
        for item_id in request.ids:
            success = await service.delete(item_id, user_id=str(current_user.id))
            if success:
                deleted_count += 1
        
        logger.info(f"Batch deleted {deleted_count} request_commentss successfully")
        return {"message": f"Successfully deleted {deleted_count} request_commentss", "deleted_count": deleted_count}
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch delete: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch delete failed: {str(e)}")


@router.delete("/{id}")
async def delete_request_comments(
    id: int,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a single request_comments by ID (requires ownership)"""
    logger.debug(f"Deleting request_comments with id: {id}")
    
    service = Request_commentsService(db)
    try:
        success = await service.delete(id, user_id=str(current_user.id))
        if not success:
            logger.warning(f"Request_comments with id {id} not found for deletion")
            raise HTTPException(status_code=404, detail="Request_comments not found")
        
        logger.info(f"Request_comments {id} deleted successfully")
        return {"message": "Request_comments deleted successfully", "id": id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting request_comments {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")