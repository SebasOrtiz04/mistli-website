from fastapi import APIRouter, HTTPException

from app.schemas.contact import ContactRequest
from app.schemas.support import SupportRequest
from app.services.contact_service import send_contact_email
from app.services.support_service import send_support_email


router = APIRouter(
    prefix="/api",
    tags=["Forms"],
)


@router.post("/contact")
async def contact(data: ContactRequest):

    try:

        await send_contact_email(data)

        return {
            "success": True,
            "message": "Solicitud enviada correctamente.",
        }

    except ValueError as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )

    except RuntimeError as exc:

        raise HTTPException(
            status_code=502,
            detail=str(exc),
        )


@router.post("/support")
async def support(data: SupportRequest):

    try:

        await send_support_email(data)

        return {
            "success": True,
            "message": "Solicitud de soporte enviada correctamente.",
        }

    except ValueError as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )

    except RuntimeError as exc:

        raise HTTPException(
            status_code=502,
            detail=str(exc),
        )
