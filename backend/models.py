from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from database import Base 

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    product_text = Column(Text, nullable=False)
    sentiment = Column(String, index=True)
    sentiment_score = Column(String)
    key_points = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())