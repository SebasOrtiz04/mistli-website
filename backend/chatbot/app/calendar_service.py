import os
import json

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


GOOGLE_TOKEN_JSON = os.getenv("GOOGLE_TOKEN_JSON")

SCOPES = [
    "https://www.googleapis.com/auth/calendar"
]


def get_calendar_service():

    if not GOOGLE_TOKEN_JSON:
        raise RuntimeError(
            "GOOGLE_TOKEN_JSON no está configurado."
        )

    try:
        token_data = json.loads(GOOGLE_TOKEN_JSON)
    except json.JSONDecodeError as e:
        raise RuntimeError(
            f"GOOGLE_TOKEN_JSON no contiene JSON válido: {e}"
        )

    creds = Credentials.from_authorized_user_info(
        token_data,
        SCOPES
    )

    if creds.expired:

        if not creds.refresh_token:
            raise RuntimeError(
                "El token expiró y no tiene refresh_token."
            )

        creds.refresh(Request())

    if not creds.valid:
        raise RuntimeError(
            "Las credenciales de Google no son válidas."
        )

    return build(
        "calendar",
        "v3",
        credentials=creds
    )