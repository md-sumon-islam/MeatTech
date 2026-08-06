<<<<<<< HEAD
# ==========================================
# BACKEND: backend/main.py
# ==========================================
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="MeatTech API")

=======
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
>>>>>>> af2bc89b87f38d9677add7a5e267fb4f5fd582fc
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
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
=======
class ProductReview(BaseModel):
    product_name: str
    rating: int
    comment: str

# In-memory Review Store
reviews_db = [
    {"product_name": "Fresh Beef Cut", "rating": 5, "comment": "Excellent quality!"}
]

# 1. GET ALL REVIEWS
@app.get("/api/reviews")
def get_reviews():
    return reviews_db

# 2. CREATE A REVIEW
@app.post("/api/reviews")
def create_review(review: ProductReview):
    reviews_db.append(review.dict())
    return {"message": "Review saved successfully!", "data": review}

# 3. UPDATE A REVIEW
@app.put("/api/reviews/{index}")
def update_review(index: int, review: ProductReview):
    if index < 0 or index >= len(reviews_db):
        raise HTTPException(status_code=404, detail="Review not found")
    reviews_db[index] = review.dict()
    return {"message": "Review updated successfully!"}

# 4. DELETE A REVIEW
@app.delete("/api/reviews/{index}")
def delete_review(index: int):
    if index < 0 or index >= len(reviews_db):
        raise HTTPException(status_code=404, detail="Review not found")
    deleted_item = reviews_db.pop(index)
    return {"message": "Review deleted successfully!"}
>>>>>>> af2bc89b87f38d9677add7a5e267fb4f5fd582fc
