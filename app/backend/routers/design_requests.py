import json
import logging
from typing import List, Optional


from fastapi import APIRouter, Body, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from core.database import get_db
from services.design_requests import Design_requestsService
from dependencies.auth import get_current_user
from schemas.auth import UserResponse

# Set up logging
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1/entities/design_requests", tags=["design_requests"])


# ---------- Pydantic Schemas ----------
class Design_requestsData(BaseModel):
    """Entity data schema (for create/update)"""
    title: str
    category: str
    brand_name: Optional[str] = None
    priority: str
    status: str
    description: Optional[str] = None
    designer_name: Optional[str] = None
    include_source: Optional[bool] = None
    due_date: Optional[str] = None
    revision_count: Optional[int] = None
    dimensions: Optional[str] = None
    reference_links: Optional[str] = None


class Design_requestsUpdateData(BaseModel):
    """Update entity data (partial updates allowed)"""
    title: Optional[str] = None
    category: Optional[str] = None
    brand_name: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    designer_name: Optional[str] = None
    include_source: Optional[bool] = None
    due_date: Optional[str] = None
    revision_count: Optional[int] = None
    dimensions: Optional[str] = None
    reference_links: Optional[str] = None


class Design_requestsResponse(BaseModel):
    """Entity response schema"""
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
    revision_count: Optional[int] = None
    dimensions: Optional[str] = None
    reference_links: Optional[str] = None

    class Config:
        from_attributes = True


class Design_requestsListResponse(BaseModel):
    """List response schema"""
    items: List[Design_requestsResponse]
    total: int
    skip: int
    limit: int


class Design_requestsBatchCreateRequest(BaseModel):
    """Batch create request"""
    items: List[Design_requestsData]


class Design_requestsBatchUpdateItem(BaseModel):
    """Batch update item"""
    id: int
    updates: Design_requestsUpdateData


class Design_requestsBatchUpdateRequest(BaseModel):
    """Batch update request"""
    items: List[Design_requestsBatchUpdateItem]


class Design_requestsBatchDeleteRequest(BaseModel):
    """Batch delete request"""
    ids: List[int]


# ---------- Routes ----------
@router.get("", response_model=Design_requestsListResponse)
async def query_design_requestss(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Query design_requestss with filtering, sorting, and pagination (user can only see their own records)"""
    logger.debug(f"Querying design_requestss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")
    
    service = Design_requestsService(db)
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
        logger.debug(f"Found {result['total']} design_requestss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying design_requestss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/all", response_model=Design_requestsListResponse)
async def query_design_requestss_all(
    query: str = Query(None, description="Query conditions (JSON string)"),
    sort: str = Query(None, description="Sort field (prefix with '-' for descending)"),
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(20, ge=1, le=2000, description="Max number of records to return"),
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    db: AsyncSession = Depends(get_db),
):
    # Query design_requestss with filtering, sorting, and pagination without user limitation
    logger.debug(f"Querying design_requestss: query={query}, sort={sort}, skip={skip}, limit={limit}, fields={fields}")

    service = Design_requestsService(db)
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
        logger.debug(f"Found {result['total']} design_requestss")
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error querying design_requestss: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get("/{id}", response_model=Design_requestsResponse)
async def get_design_requests(
    id: int,
    fields: str = Query(None, description="Comma-separated list of fields to return"),
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a single design_requests by ID (user can only see their own records)"""
    logger.debug(f"Fetching design_requests with id: {id}, fields={fields}")
    
    service = Design_requestsService(db)
    try:
        result = await service.get_by_id(id, user_id=str(current_user.id))
        if not result:
            logger.warning(f"Design_requests with id {id} not found")
            raise HTTPException(status_code=404, detail="Design_requests not found")
        
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching design_requests {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("", response_model=Design_requestsResponse, status_code=201)
async def create_design_requests(
    data: Design_requestsData,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new design_requests"""
    logger.debug(f"Creating new design_requests with data: {data}")
    
    service = Design_requestsService(db)
    try:
        result = await service.create(data.model_dump(), user_id=str(current_user.id))
        if not result:
            raise HTTPException(status_code=400, detail="Failed to create design_requests")
        
        logger.info(f"Design_requests created successfully with id: {result.id}")
        return result
    except ValueError as e:
        logger.error(f"Validation error creating design_requests: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating design_requests: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.post("/batch", response_model=List[Design_requestsResponse], status_code=201)
async def create_design_requestss_batch(
    request: Design_requestsBatchCreateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create multiple design_requestss in a single request"""
    logger.debug(f"Batch creating {len(request.items)} design_requestss")
    
    service = Design_requestsService(db)
    results = []
    
    try:
        for item_data in request.items:
            result = await service.create(item_data.model_dump(), user_id=str(current_user.id))
            if result:
                results.append(result)
        
        logger.info(f"Batch created {len(results)} design_requestss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch create: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch create failed: {str(e)}")


@router.put("/batch", response_model=List[Design_requestsResponse])
async def update_design_requestss_batch(
    request: Design_requestsBatchUpdateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update multiple design_requestss in a single request (requires ownership)"""
    logger.debug(f"Batch updating {len(request.items)} design_requestss")
    
    service = Design_requestsService(db)
    results = []
    
    try:
        for item in request.items:
            # Only include non-None values for partial updates
            update_dict = {k: v for k, v in item.updates.model_dump().items() if v is not None}
            result = await service.update(item.id, update_dict, user_id=str(current_user.id))
            if result:
                results.append(result)
        
        logger.info(f"Batch updated {len(results)} design_requestss successfully")
        return results
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch update: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch update failed: {str(e)}")


@router.put("/{id}", response_model=Design_requestsResponse)
async def update_design_requests(
    id: int,
    data: Design_requestsUpdateData,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update an existing design_requests (requires ownership)"""
    logger.debug(f"Updating design_requests {id} with data: {data}")

    service = Design_requestsService(db)
    try:
        # Only include non-None values for partial updates
        update_dict = {k: v for k, v in data.model_dump().items() if v is not None}
        result = await service.update(id, update_dict, user_id=str(current_user.id))
        if not result:
            logger.warning(f"Design_requests with id {id} not found for update")
            raise HTTPException(status_code=404, detail="Design_requests not found")
        
        logger.info(f"Design_requests {id} updated successfully")
        return result
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error updating design_requests {id}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error updating design_requests {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.delete("/batch")
async def delete_design_requestss_batch(
    request: Design_requestsBatchDeleteRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete multiple design_requestss by their IDs (requires ownership)"""
    logger.debug(f"Batch deleting {len(request.ids)} design_requestss")
    
    service = Design_requestsService(db)
    deleted_count = 0
    
    try:
        for item_id in request.ids:
            success = await service.delete(item_id, user_id=str(current_user.id))
            if success:
                deleted_count += 1
        
        logger.info(f"Batch deleted {deleted_count} design_requestss successfully")
        return {"message": f"Successfully deleted {deleted_count} design_requestss", "deleted_count": deleted_count}
    except Exception as e:
        await db.rollback()
        logger.error(f"Error in batch delete: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Batch delete failed: {str(e)}")


@router.delete("/{id}")
async def delete_design_requests(
    id: int,
    current_user: UserResponse = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a single design_requests by ID (requires ownership)"""
    logger.debug(f"Deleting design_requests with id: {id}")
    
    service = Design_requestsService(db)
    try:
        success = await service.delete(id, user_id=str(current_user.id))
        if not success:
            logger.warning(f"Design_requests with id {id} not found for deletion")
            raise HTTPException(status_code=404, detail="Design_requests not found")
        
        logger.info(f"Design_requests {id} deleted successfully")
        return {"message": "Design_requests deleted successfully", "id": id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting design_requests {id}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")