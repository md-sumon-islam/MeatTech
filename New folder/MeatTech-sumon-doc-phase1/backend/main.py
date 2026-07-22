from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import ProductReview

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


reviews_db = [
    {"product_name": "Premium Beef", "rating": 5, "comment": "Great quality meat!"}
]


@app.get("/api/reviews")
def get_reviews():
    return reviews_db


@app.post("/api/reviews")
def create_review(review: ProductReview):
    new_review = review.dict()
    reviews_db.append(new_review)
    return {"message": "Review added successfully", "data": new_review}