from pydantic import BaseModel, EmailStr, Field


class SupportRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr

    subject: str = Field(
        default="Soporte",
        max_length=200,
    )

    message: str = Field(
        ...,
        min_length=10,
        max_length=5000,
    )