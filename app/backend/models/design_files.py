from core.database import Base
from sqlalchemy import Boolean, Column, DateTime, Integer, String


class Design_files(Base):
    __tablename__ = "design_files"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    request_id = Column(Integer, nullable=False)
    file_name = Column(String, nullable=False)
    object_key = Column(String, nullable=False)
    file_type = Column(String, nullable=True)
    file_size = Column(Integer, nullable=True)
    version = Column(Integer, nullable=True)
    is_source = Column(Boolean, nullable=True)
    is_final = Column(Boolean, nullable=True)
    uploaded_by = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=True)