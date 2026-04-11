from core.database import Base
from sqlalchemy import Column, Integer, String


class Status_history(Base):
    __tablename__ = "status_history"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, nullable=False)
    user_id = Column(String, nullable=False)
    request_id = Column(Integer, nullable=False)
    from_status = Column(String, nullable=False)
    to_status = Column(String, nullable=False)
    changed_by = Column(String, nullable=False)
    note = Column(String, nullable=True)