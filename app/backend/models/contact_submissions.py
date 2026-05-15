from core.database import Base
from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String


class Contact_submissions(Base):
    __tablename__ = "contact_submissions"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    company = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    budget = Column(String, nullable=True)
    message = Column(String, nullable=False)
    services = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.now)
    updated_at = Column(DateTime(timezone=True), default=datetime.now, onupdate=datetime.now)