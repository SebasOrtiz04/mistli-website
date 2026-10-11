# enviar varios correos para callior
from dotenv import load_dotenv
from template.cartaPresentacion import send_template_message

load_dotenv()

correos=[
    "fercienciaypagos@gmail.com",
]

for correo in correos:
    try:
        print(f"enviando correo a {correo}")
        response = send_template_message(correo)
        print('Status:', response.status_code)
        print('Body:', response.text)
    except Exception as e:
        print(f"Error al enviar correo a {correo}: {e}")