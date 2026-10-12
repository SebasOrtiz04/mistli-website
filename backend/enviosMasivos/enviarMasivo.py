# enviar varios correos para callior
from dotenv import load_dotenv
from template.cartaPresentacion import send_template_message
import json

load_dotenv()
correos=[]

# ARCHIVO = "correosprueba.json"
ARCHIVO = "correos_primeros50.json"


def cargar_correos(ruta):
    with open(ruta, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["correos"]

correos = cargar_correos(ARCHIVO)
for correo in correos:
    try:
        print(f"enviando correo a {correo}")
        response = send_template_message(correo)
        print('Status:', response.status_code)
        print('Body:', response.text)
    except Exception as e:
        print(f"Error al enviar correo a {correo}: {e}")