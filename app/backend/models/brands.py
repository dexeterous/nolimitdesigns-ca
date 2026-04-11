from core.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Brands(Base):
    __tablename__ = "brands"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    name = Column(String, nullable=False)
    logo_url = Column(String, nullable=True)
    color_primary = Column(String, nullable=True)
    color_secondary = Column(String, nullable=True)
    guidelines = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=True)