from typing import Optional
import uuid
from langchain_core.tools import tool

from app.functions.functionsCalendar import check_calendar_availability_2, create_calendar_event_2
from app.functions.functionsMailgun import send_chat_history_by_email_2

# ============================================================
# TOOL 1
# REVISAR CALENDARIO
# ============================================================



@tool
async def check_calendar_availability(
    start: str,
    end: str,
) -> str:
    """
    Consulta Google Calendar para determinar si el intervalo solicitado
    está libre u ocupado.

    Usa esta herramienta ANTES de crear una junta.

    IMPORTANTE:
    - Esta herramienta SOLO consulta disponibilidad.
    - NO crea, modifica ni elimina eventos.
    - Si devuelve "CALENDARIO LIBRE", puedes proceder a crear la junta.
    - Si devuelve "CALENDARIO OCUPADO", NO crees la junta en ese horario.
    - No es necesario volver a consultar este mismo intervalo si ya fue
      verificado y posteriormente no se ha cambiado el horario.

    Parámetros:
    start: Inicio del intervalo en formato ISO 8601.
    end: Fin del intervalo en formato ISO 8601.
    """

    return await check_calendar_availability_2(
        start=start,
        end=end,
    )


# ============================================================
# TOOL 2
# CREAR JUNTA + GOOGLE MEET
# ============================================================

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
    Crea una reunión en Google Calendar y genera un enlace de Google Meet.

    IMPORTANTE:
    Esta herramienta realiza una acción real.

    El agente debe haber verificado previamente la disponibilidad
    mediante check_calendar_availability.

    La función realiza además una segunda validación interna justo
    antes de crear el evento para evitar crear una reunión sobre
    un horario que haya quedado ocupado.

    Si la validación interna detecta un conflicto:
    - NO crea la reunión.
    - Devuelve un ERROR.
    - El agente debe solicitar otro horario.

    Si la reunión se crea correctamente:
    - No debe volver a llamarse esta herramienta.
    - No debe volver a verificarse el mismo horario.
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
@tool
async def send_chat_history_by_email(
    chat_history: str,
    recipient: Optional[str] = None,
) -> str:
    """
    Envía UNA SOLA VEZ el historial de la conversación por correo.

    Usa esta herramienta DESPUÉS de crear correctamente una junta.

    IMPORTANTE:
    - Solo ejecútala cuando la junta haya sido creada correctamente.
    - No la ejecutes si la creación de la junta falló.
    - Después de recibir "Historial enviado correctamente", termina
      el flujo de agendamiento.
    - NO vuelvas a llamar a esta herramienta después de un envío exitoso.
    
    Parámetros:
    chat_history: Historial completo de la conversación.
    recipient: Correo electrónico del destinatario.
    """
    return await send_chat_history_by_email_2(
        chat_history=chat_history,
        recipient=recipient,
    )