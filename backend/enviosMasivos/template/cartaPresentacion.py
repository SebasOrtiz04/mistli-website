import requests
import os
from config import API_KEY

def send_template_message(to_email):
    pdf_path = "pdf/Carta_presentacion_Mistli.pdf"

    with open(pdf_path, "rb") as pdf:
        response = requests.post(
            "https://api.mailgun.net/v3/mistli.com.mx/messages",
            auth=("api", API_KEY),
            data={
                "from": "Contacto <contacto@mistli.com.mx>",
                "to": to_email,
                "template": "Carta presentación"
            },
            files=[
                ("attachment", (
                    "Carta_presentacion_Mistli.pdf",
                    pdf,
                    "application/pdf"
                ))
            ],
            timeout=30
        )

    response.raise_for_status()
    return response