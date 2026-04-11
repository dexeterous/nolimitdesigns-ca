from core.database import Base
from sqlalchemy import Column, DateTime, Integer, String


class Team_members(Base):
    __tablename__ = "team_members"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    member_email = Column(String, nullable=False)
    member_name = Column(String, nullable=True)
    role = Column(String, nullable=False)
    status = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=True)