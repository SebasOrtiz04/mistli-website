from app.config import (
    GOOGLE_CALENDAR_ID,
    GOOGLE_CALENDAR_TIMEZONE
)
from app.calendar_service import get_calendar_service
from typing import Optional
import uuid
from app.helpers import parse_datetime, format_datetime


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
