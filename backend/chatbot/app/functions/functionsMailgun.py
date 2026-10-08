# app/services/mailgun_service.py

from typing import Optional

import httpx

from app.config import (
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    MAILGUN_FROM,
    MAILGUN_TO,
)


async def send_email_mailgun(
    *,
    subject: str,
    text: str,
    html: str,
    reply_to: Optional[str] = None,
) -> str:

    if not MAILGUN_API_KEY:
        raise ValueError("MAILGUN_API_KEY no está configurado.")

    if not MAILGUN_DOMAIN:
        raise ValueError("MAILGUN_DOMAIN no está configurado.")

    if not MAILGUN_FROM:
        raise ValueError("MAILGUN_FROM no está configurado.")

    if not MAILGUN_TO:
        raise ValueError("MAILGUN_TO no está configurado.")

    url = (
        f"https://api.mailgun.net/v3/"
        f"{MAILGUN_DOMAIN}/messages"
    )

    data = {
        "from": MAILGUN_FROM,
        "to": MAILGUN_TO,
        "subject": subject,
        "text": text,
        "html": html,
    }

    if reply_to:
        data["h:Reply-To"] = reply_to

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                url,
                auth=("api", MAILGUN_API_KEY),
                data=data,
            )

        response.raise_for_status()

    except httpx.HTTPStatusError as exc:
        raise RuntimeError(
            f"Mailgun rechazó el envío. "
            f"HTTP {exc.response.status_code}: "
            f"{exc.response.text}"
        ) from exc

    except httpx.RequestError as exc:
        raise RuntimeError(
            f"No se pudo conectar con Mailgun: {exc}"
        ) from exc

    return "Email enviado correctamente."


async def send_chat_history_by_email_2(
    chat_history: str,
    recipient: Optional[str] = None,
) -> str:

    if not MAILGUN_API_KEY:
        return "ERROR: MAILGUN_API_KEY no está configurado."

    if not MAILGUN_DOMAIN:
        return "ERROR: MAILGUN_DOMAIN no está configurado."

    if not MAILGUN_FROM:
        return "ERROR: MAILGUN_FROM no está configurado."

    destination = recipient

    if not destination:
        return "ERROR: No se especificó un correo destinatario."

    url = (
        f"https://api.mailgun.net/v3/"
        f"{MAILGUN_DOMAIN}/messages"
    )

    data = {
        "from": MAILGUN_FROM,
        "to": destination,
        "cc": MAILGUN_TO,
        "subject": "Historial de conversación con AI Assistant",
        "text": chat_history,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:

            response = await client.post(
                url,
                auth=("api", MAILGUN_API_KEY),
                data=data,
            )

        response.raise_for_status()

    except httpx.HTTPStatusError as exc:

        return (
            "ERROR: Mailgun rechazó el envío. "
            f"HTTP {exc.response.status_code}: "
            f"{exc.response.text}"
        )

    except httpx.RequestError as exc:

        return (
            "ERROR: No se pudo conectar con Mailgun. "
            f"{str(exc)}"
        )

    return (
        f"Historial enviado correctamente a {destination}."
    )
