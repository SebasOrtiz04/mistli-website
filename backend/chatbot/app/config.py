import os

from dotenv import load_dotenv


load_dotenv()


OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    "http://127.0.0.1:11434"
)

OLLAMA_MODEL = os.getenv(
    "OLLAMA_MODEL",
    "qwen3:8b"
)


GOOGLE_CALENDAR_ID = os.getenv(
    "GOOGLE_CALENDAR_ID",
    "primary"
)

GOOGLE_CALENDAR_TIMEZONE = os.getenv(
    "GOOGLE_CALENDAR_TIMEZONE",
    "America/Mexico_City"
)


MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
MAILGUN_DOMAIN = os.getenv("MAILGUN_DOMAIN")
MAILGUN_FROM = os.getenv("MAILGUN_FROM")
MAILGUN_TO = os.getenv("MAILGUN_TO")