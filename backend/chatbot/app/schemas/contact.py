# app/schemas/contact.py

from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    company: Optional[str] = Field(default="", max_length=150)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)

    service: str = Field(..., min_length=1, max_length=80)
    serviceType: Optional[str] = Field(default=None, max_length=100)

    message: str = Field(..., min_length=10, max_length=5000)
    budget: Optional[str] = Field(default="", max_length=50)

    source: Optional[str] = Field(default="", max_length=200)