from core.database import Base
from sqlalchemy import Boolean, Column, Integer, String


class Design_requests(Base):
    __tablename__ = "design_requests"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    brand_name = Column(String, nullable=True)
    priority = Column(String, nullable=False)
    status = Column(String, nullable=False)
    description = Column(String, nullable=True)
    designer_name = Column(String, nullable=True)
    include_source = Column(Boolean, nullable=True)
    due_date = Column(String, nullable=True)
    revision_count = Column(Integer, nullable=True)
    dimensions = Column(String, nullable=True)
    reference_links = Column(String, nullable=True)