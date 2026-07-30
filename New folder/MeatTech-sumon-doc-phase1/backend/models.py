from pydantic import BaseModel
class ProductReview(BaseModel):
    product_name: str
    comment: str
    rating: int
