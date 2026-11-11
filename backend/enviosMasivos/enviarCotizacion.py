# enviar varios correos para callior
from dotenv import load_dotenv
from template.cotizaciones import enviar_cotizacion
import json

load_dotenv()

correo = "fernandosanchezor@gmail.com"
try:
   enviar_cotizacion(
           destinatario=correo,
           asunto="Propuesta económica - Mistli",
           mensaje="""
   Hola,
   
   Te compartimos nuestra propuesta económica en PDF.
   
   También adjuntamos algunas imágenes de referencia para complementar
   la presentación.
   
   Quedamos atentos a tus comentarios.
   
   Saludos,
   Equipo Mistli
           """
       )
   
except Exception as e:
    print(f"Error al enviar correo a {correo}: {e}")