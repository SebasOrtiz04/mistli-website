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
                "from": "Fernando <contacto@mistli.com.mx>",
                "to": to_email,
                "subject": "Una oportunidad para mejorar los procesos de su empresa",
"text": """Buen día,

¿Ha identificado tareas en su empresa que podrían realizarse más rápido, con menos errores o sin depender tanto del trabajo manual?

Soy Fernando Sánchez, fundador de Mistli. Desarrollamos software a la medida para ayudar a las empresas a resolver problemas operativos, automatizar procesos y aprovechar nuevas oportunidades mediante la tecnología.

Me gustaría conocer brevemente su operación y explorar si podemos ayudarle con alguna necesidad concreta. La primera consulta es sin costo y sin compromiso.

¿Tendría 15 minutos disponibles para conversar esta semana?

Le comparto nuestra carta de presentación para que conozca más sobre Mistli.

Saludos cordiales,

Fernando Sánchez Ortega
Fundador | Mistli
contacto@mistli.com.mx
[www.mistli.com.mx](https://mistli.com.mx)""",
                # "template": "Carta presentación"
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