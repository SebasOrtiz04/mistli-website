from pathlib import Path

from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


SCOPES = [
    "https://www.googleapis.com/auth/calendar"
]

BASE_DIR = Path(__file__).resolve().parent
CREDENTIALS_FILE = BASE_DIR / "credentials.json"
TOKEN_FILE = BASE_DIR / "token.json"


def main():
    if not CREDENTIALS_FILE.exists():
        raise FileNotFoundError(
            f"No se encontró credentials.json en:\n{CREDENTIALS_FILE}"
        )

    creds = None

    # Si ya existe un token, intenta reutilizarlo.
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(
            str(TOKEN_FILE),
            SCOPES,
        )

    # Si el token expiró pero tiene refresh token, lo renueva.
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())

    # Si no hay credenciales válidas, abre el flujo OAuth.
    if not creds or not creds.valid:
        flow = InstalledAppFlow.from_client_secrets_file(
            str(CREDENTIALS_FILE),
            SCOPES,
        )

        creds = flow.run_local_server(
            port=0,
            access_type="offline",
            prompt="consent",
        )

    # Guarda access token + refresh token.
    TOKEN_FILE.write_text(
        creds.to_json(),
        encoding="utf-8",
    )

    print()
    print("========================================")
    print("Google Calendar autorizado correctamente")
    print("========================================")
    print(f"Token generado en:")
    print(TOKEN_FILE)
    print()


if __name__ == "__main__":
    main()
