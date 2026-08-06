# ==========================================
# BACKEND: backend/main.py
# ==========================================
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="MeatTech API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Review(BaseModel):
    id: int
    name: str
    rating: int
    comment: str

class ReviewCreate(BaseModel):
    name: str
    rating: int
    comment: str

reviews_db: List[Review] = []
review_id_counter = 1

@app.get("/api/reviews", response_model=List[Review])
def get_reviews():
    return reviews_db

@app.post("/api/reviews", response_model=Review)
def add_review(review: ReviewCreate):
    global review_id_counter
    new_review = Review(
        id=review_id_counter,
        name=review.name,
        rating=review.rating,
        comment=review.comment
    )
    reviews_db.append(new_review)
    review_id_counter += 1
    return new_review

@app.put("/api/reviews/{review_id}", response_model=Review)
def update_review(review_id: int, updated_review: ReviewCreate):
    for i, review in enumerate(reviews_db):
        if review.id == review_id:
            reviews_db[i] = Review(
                id=review_id,
                name=updated_review.name,
                rating=updated_review.rating,
                comment=updated_review.comment
            )
            return reviews_db[i]
    raise HTTPException(status_code=404, detail="Review not found")

@app.delete("/api/reviews/{review_id}")
def delete_review(review_id: int):
    global reviews_db
    for i, review in enumerate(reviews_db):
        if review.id == review_id:
            del reviews_db[i]
            return {"message": "Review deleted successfully"}
    raise HTTPException(status_code=404, detail="Review not found")