
import os
import requests
from pathlib import Path
from config import API_KEY

# Configuración Mailgun
MAILGUN_DOMAIN = "mistli.com.mx"
MAILGUN_FROM = "contacto@mistli.com.mx"

MAILGUN_URL = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages"

# Directorios
PDF_DIR = Path("cotizaciones/pdfs")
IMAGE_DIR = Path("cotizaciones/imagenes")


def enviar_cotizacion(destinatario, asunto, mensaje):

    if not all([API_KEY, MAILGUN_DOMAIN, MAILGUN_FROM]):
        raise ValueError("Faltan credenciales de Mailgun en .env")

    # Obtener PDF
    pdfs = list(PDF_DIR.glob("*.pdf"))
    if not pdfs:
        raise FileNotFoundError("No se encontró ningún PDF en cotizaciones/pdfs")

    if len(pdfs) > 1:
        raise ValueError("Hay más de un PDF. Deja únicamente el que deseas enviar.")

    pdf_path = pdfs[0]

    # Obtener imágenes
    extensiones = ["*.png", "*.jpg", "*.jpeg", "*.webp"]
    imagenes = []

    for extension in extensiones:
        imagenes.extend(IMAGE_DIR.glob(extension))

    # Preparar adjuntos
    archivos = [
        ("attachment", (pdf_path.name, open(pdf_path, "rb")))
    ]

    for imagen in imagenes:
        archivos.append(
            ("attachment", (imagen.name, open(imagen, "rb")))
        )

    # Datos del correo
    data = {
        "from": MAILGUN_FROM,
        "to": destinatario,
        "subject": asunto,
        "text": mensaje
    }

    try:
        response = requests.post(
            MAILGUN_URL,
            auth=("api", API_KEY),
            data=data,
            files=archivos,
            timeout=60
        )

        response.raise_for_status()

        print("Correo enviado correctamente.")
        print(response.json())

        return response.json()

    except requests.exceptions.RequestException as error:
        print(f"Error enviando correo: {error}")
        raise

    finally:
        for _, (_, archivo) in archivos:
            archivo.close()



    