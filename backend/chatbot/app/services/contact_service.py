from html import escape

from app.schemas.contact import ContactRequest
from app.functions.functionsMailgun import send_email_mailgun

def build_contact_email(data: ContactRequest):

    service = escape(data.service)
    service_type = escape(data.serviceType or "No especificado")

    name = escape(data.name)
    company = escape(data.company or "No especificada")
    email = escape(str(data.email))
    phone = escape(data.phone or "No proporcionado")

    message = escape(data.message)
    budget = escape(data.budget or "No especificado")
    source = escape(data.source or "No especificado")

    subject = (
        f"Nueva solicitud de proyecto — "
        f"{data.service}"
    )

    text = f"""
Nueva solicitud de proyecto — Mistli

Nombre:
{data.name}

Empresa:
{data.company or "No especificada"}

Email:
{data.email}

WhatsApp:
{data.phone or "No proporcionado"}

Servicio:
{data.service}

Tipo:
{data.serviceType or "No especificado"}

Presupuesto:
{data.budget or "No especificado"}

Mensaje:
{data.message}

Origen:
{data.source or "No especificado"}
""".strip()

    html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>

<body style="
    margin:0;
    padding:0;
    background:#080A10;
    font-family:Arial,Helvetica,sans-serif;
    color:#F4F5F8;
">

<table width="100%" cellpadding="0" cellspacing="0"
       style="background:#080A10;padding:40px 20px;">

<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0"
       style="
           max-width:620px;
           width:100%;
           background:#11131C;
           border:1px solid #252833;
           border-radius:20px;
           overflow:hidden;
       ">

<tr>
<td style="
    padding:32px;
    background:
        linear-gradient(
            135deg,
            rgba(121,146,252,.16),
            rgba(60,203,232,.08)
        );
">

<div style="
    font-size:12px;
    font-weight:bold;
    letter-spacing:2px;
    color:#60E0FA;
    text-transform:uppercase;
">
    MISTLI
</div>

<h1 style="
    margin:12px 0 0;
    font-size:26px;
    color:#FFFFFF;
">
    Nueva solicitud de proyecto
</h1>

<p style="
    color:#858B9D;
    font-size:14px;
    line-height:1.7;
">
    Alguien ha enviado una solicitud desde el sitio web de Mistli.
</p>

</td>
</tr>

<tr>
<td style="padding:32px;">

<table width="100%" cellpadding="0" cellspacing="0">

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Nombre
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {name}
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Empresa
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {company}
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Email
</td>
<td style="padding:10px 0;font-size:14px;">
    <a href="mailto:{email}"
       style="color:#60E0FA;text-decoration:none;">
        {email}
    </a>
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    WhatsApp
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {phone}
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Servicio
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {service}
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Tipo
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {service_type}
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Presupuesto
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {budget}
</td>
</tr>

</table>

<div style="
    margin-top:28px;
    padding:20px;
    border-radius:14px;
    background:#0D0F18;
    border:1px solid #252833;
">

<div style="
    font-size:11px;
    font-weight:bold;
    letter-spacing:1.5px;
    color:#60E0FA;
    text-transform:uppercase;
    margin-bottom:10px;
">
    Mensaje
</div>

<div style="
    color:#D0D3DD;
    font-size:14px;
    line-height:1.8;
    white-space:pre-line;
">
    {message}
</div>

</div>

<p style="
    margin-top:24px;
    color:#62687A;
    font-size:11px;
">
    Origen: {source}
</p>

</td>
</tr>

<tr>
<td style="
    padding:20px 32px;
    border-top:1px solid #252833;
    color:#62687A;
    font-size:11px;
">
    Mistli · Software, AI & Automation
</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
"""

    return subject, text, html


async def send_contact_email(data: ContactRequest):

    subject, text, html = build_contact_email(data)

    return await send_email_mailgun(
        subject=subject,
        text=text,
        html=html,
        reply_to=str(data.email),
    )