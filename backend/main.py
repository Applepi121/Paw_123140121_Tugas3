from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime # <--- PENTING: Import ini ditambahkan
import models, database, ai_services

# Init DB
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Review Analyzer Pro")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewCreate(BaseModel):
    text: str

class ReviewResponse(BaseModel):
    id: int
    product_text: str
    sentiment: str
    sentiment_score: str
    key_points: List[str]
    # PERBAIKAN DI SINI: Ubah dari 'str' menjadi 'datetime'
    created_at: datetime | None = None 

    class Config:
        from_attributes = True

@app.post("/api/analyze-review", response_model=ReviewResponse)
def analyze_review(review: ReviewCreate, db: Session = Depends(database.get_db)):
    if not review.text.strip():
        raise HTTPException(status_code=400, detail="Review text cannot be empty")

    # 1. Panggil Sentiment
    sentiment, score = ai_services.analyze_sentiment(review.text)

    # 2. Panggil Insight
    key_points = ai_services.extract_insight(review.text)

    # 3. Simpan ke Database
    db_review = models.Review(
        product_text=review.text,
        sentiment=sentiment,
        sentiment_score=score,
        key_points=key_points
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)

    return db_review

@app.get("/api/reviews", response_model=List[ReviewResponse])
def get_reviews(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    reviews = db.query(models.Review).order_by(models.Review.created_at.desc()).offset(skip).limit(limit).all()
    return reviews