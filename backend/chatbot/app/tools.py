from datetime import datetime
from zoneinfo import ZoneInfo
from typing import Optional
import uuid

import httpx
from langchain_core.tools import tool

from app.calendar_service import get_calendar_service
from app.config import (
    GOOGLE_CALENDAR_ID,
    GOOGLE_CALENDAR_TIMEZONE,
    MAILGUN_API_KEY,
    MAILGUN_DOMAIN,
    MAILGUN_FROM,
    MAILGUN_TO,
)


# ============================================================
# HELPERS
# ============================================================

MEXICO_TZ = ZoneInfo("America/Mexico_City")


def parse_datetime(value: str) -> datetime:
    value = value.strip()

    if value.endswith("Z"):
        value = value[:-1] + "+00:00"

    dt = datetime.fromisoformat(value)

    # Si no trae timezone, asumimos Ciudad de México
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=MEXICO_TZ)

    return dt


def format_datetime(value: str) -> str:
    dt = parse_datetime(value)
    return dt.isoformat()


# ============================================================
# TOOL 1
# REVISAR CALENDARIO
# ============================================================

async def check_calendar_availability_2(
    start: str,
    end: str,
) -> str:

    service = get_calendar_service()

    start_dt = parse_datetime(start)
    end_dt = parse_datetime(end)

    if end_dt <= start_dt:
        return (
            "ERROR: La fecha y hora de finalización "
            "debe ser posterior a la fecha y hora de inicio."
        )

    start_iso = start_dt.isoformat()
    end_iso = end_dt.isoformat()

    events_result = service.events().list(
        calendarId=GOOGLE_CALENDAR_ID,
        timeMin=start_iso,
        timeMax=end_iso,
        singleEvents=True,
        orderBy="startTime",
    ).execute()

    events = events_result.get("items", [])

    if not events:
        return (
            "CALENDARIO LIBRE. "
            "No existen eventos que se crucen con el horario solicitado."
        )

    result = [
        "CALENDARIO OCUPADO. Se encontraron las siguientes juntas:"
    ]

    for event in events:

        summary = event.get(
            "summary",
            "Sin título",
        )

        event_start = event.get(
            "start",
            {},
        ).get(
            "dateTime",
            event.get("start", {}).get("date"),
        )

        event_end = event.get(
            "end",
            {},
        ).get(
            "dateTime",
            event.get("end", {}).get("date"),
        )

        result.append(
            f"- {summary}: {event_start} → {event_end}"
        )

    return "\n".join(result)


@tool
async def check_calendar_availability(
    start: str,
    end: str,
) -> str:
    """
    Revisa Google Calendar para saber si existe alguna junta
    que se cruce con el rango solicitado.

    start:
        Fecha y hora de inicio en formato ISO 8601.

    end:
        Fecha y hora de finalización en formato ISO 8601.

    Usa esta herramienta SIEMPRE antes de crear una junta.
    """

    return await check_calendar_availability_2(
        start=start,
        end=end,
    )


# ============================================================
# TOOL 2
# CREAR JUNTA + GOOGLE MEET
# ============================================================

async def create_calendar_event_2(
    title: str,
    start: str,
    end: str,
    attendee_email: str,
    description: Optional[str] = None,
    location: Optional[str] = None,
) -> str:
    if not attendee_email or "@" not in attendee_email:
        return (
            "ERROR: El correo electrónico del participante "
            "no es válido."
        )

    service = get_calendar_service()

    start_dt = parse_datetime(start)
    end_dt = parse_datetime(end)

    if end_dt <= start_dt:
        return (
            "ERROR: La fecha y hora de finalización "
            "debe ser posterior a la fecha y hora de inicio."
        )

    event = {
        "summary": title,
        "description": description or "",
        "start": {
            "dateTime": start_dt.isoformat(),
            "timeZone": GOOGLE_CALENDAR_TIMEZONE,
        },
        "end": {
            "dateTime": end_dt.isoformat(),
            "timeZone": GOOGLE_CALENDAR_TIMEZONE,
        },
        "attendees": [
            {
                "email": attendee_email,
            }
        ],
        "conferenceData": {
            "createRequest": {
                "requestId": str(uuid.uuid4()),
                "conferenceSolutionKey": {
                    "type": "hangoutsMeet",
                },
            }
        },
    }

    if location:
        event["location"] = location

    created_event = service.events().insert(
        calendarId=GOOGLE_CALENDAR_ID,
        body=event,
        conferenceDataVersion=1,
        sendUpdates="all",
    ).execute()

    event_url = created_event.get(
        "htmlLink",
        "",
    )

    meet_url = ""

    conference_data = created_event.get(
        "conferenceData",
        {},
    )

    for entry_point in conference_data.get(
        "entryPoints",
        [],
    ):
        if entry_point.get("entryPointType") == "video":
            meet_url = entry_point.get("uri", "")
            break

    if not meet_url:
        return (
            "ERROR: La junta fue creada, pero "
            "Google Meet no pudo ser generado."
        )

    return (
        f"Junta creada correctamente.\n"
        f"Título: {title}\n"
        f"Inicio: {start_dt.isoformat()}\n"
        f"Fin: {end_dt.isoformat()}\n"
        f"Participante: {attendee_email}\n"
        f"Google Meet: {meet_url}\n"
        f"Invitación enviada al participante.\n"
        f"Calendario: {event_url}"
    )


@tool
async def create_calendar_event(
    title: str,
    start: str,
    end: str,
    attendee_email: str,
    description: Optional[str] = None,
    location: Optional[str] = None,
) -> str:
    """
        Crea una junta en Google Calendar, genera una videollamada
        de Google Meet y envía la invitación al participante.
    
        IMPORTANTE:
        Antes de usar esta herramienta debes revisar disponibilidad
        usando check_calendar_availability.
    
        title:
            Título de la junta.
    
        start:
            Inicio en formato ISO 8601.
    
        end:
            Fin en formato ISO 8601.
    
        attendee_email:
            Correo electrónico del participante.
    
        description:
            Descripción opcional.
    
        location:
            Ubicación opcional.
        """
    return await create_calendar_event_2(
        title=title,
        start=start,
        end=end,
        attendee_email=attendee_email,
        description=description,
        location=location,
    )


# ============================================================
# TOOL 3
# MANDAR HISTORIAL POR MAILGUN
# ============================================================

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

    destination = recipient or MAILGUN_TO

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


@tool
async def send_chat_history_by_email(
    chat_history: str,
    recipient: Optional[str] = None,
) -> str:
    """
        Envía el historial completo de la conversación mediante Mailgun.
        chat_history:
            Historial de la conversación en texto plano.
        recipient:
            Correo electrónico del destinatario
        """
    return await send_chat_history_by_email_2(
        chat_history=chat_history,
        recipient=recipient,
    )