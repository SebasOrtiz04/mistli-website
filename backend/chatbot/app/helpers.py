from datetime import datetime
from zoneinfo import ZoneInfo

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

