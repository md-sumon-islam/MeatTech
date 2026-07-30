from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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