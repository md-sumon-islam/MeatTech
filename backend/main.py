from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import uvicorn

app = FastAPI(title="User Profile CRUD API with SQLite")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def init_db():
    conn = sqlite3.connect("meattech.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

class UserSchema(BaseModel):
    full_name: str
    email: str
    phone: str
    address: str


@app.get("/api/users")
async def get_users():
    conn = sqlite3.connect("meattech.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, full_name, email, phone, address FROM users")
    rows = cursor.fetchall()
    conn.close()
    
    users = [
        {"id": r[0], "full_name": r[1], "email": r[2], "phone": r[3], "address": r[4]}
        for r in rows
    ]
    return users


@app.post("/api/users")
async def create_user(user: UserSchema):
    conn = sqlite3.connect("meattech.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (full_name, email, phone, address) VALUES (?, ?, ?, ?)",
        (user.full_name, user.email, user.phone, user.address)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, **user.dict()}


@app.put("/api/users/{user_id}")
async def update_user(user_id: int, user: UserSchema):
    conn = sqlite3.connect("meattech.db")
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE users SET full_name=?, email=?, phone=?, address=? WHERE id=?",
        (user.full_name, user.email, user.phone, user.address, user_id)
    )
    conn.commit()
    updated = cursor.rowcount
    conn.close()
    
    if updated == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user_id, **user.dict()}


@app.delete("/api/users/{user_id}")
async def delete_user(user_id: int):
    conn = sqlite3.connect("meattech.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=?", (user_id,))
    conn.commit()
    deleted = cursor.rowcount
    conn.close()
    
    if deleted == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)