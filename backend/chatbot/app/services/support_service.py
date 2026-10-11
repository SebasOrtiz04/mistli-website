# app/services/support_service.py

from html import escape

from app.schemas.support import SupportRequest
from app.functions.functionsMailgun import send_email_mailgun


def build_support_email(data: SupportRequest):

    name = escape(data.name)
    email = escape(str(data.email))
    subject = escape(data.subject)
    message = escape(data.message)

    mail_subject = (
        f"Soporte Mistli — {data.subject}"
    )

    text = f"""
Nueva solicitud de soporte — Mistli

Nombre:
{data.name}

Email:
{data.email}

Asunto:
{data.subject}

Mensaje:
{data.message}
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
            rgba(233,66,220,.07)
        );
">

<div style="
    font-size:12px;
    font-weight:bold;
    letter-spacing:2px;
    color:#60E0FA;
">
    MISTLI SUPPORT
</div>

<h1 style="
    margin:12px 0 0;
    font-size:26px;
    color:#FFFFFF;
">
    Nueva solicitud de soporte
</h1>

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
    Email
</td>
<td style="padding:10px 0;">
    <a href="mailto:{email}"
       style="color:#60E0FA;text-decoration:none;">
        {email}
    </a>
</td>
</tr>

<tr>
<td style="padding:10px 0;color:#858B9D;font-size:13px;">
    Asunto
</td>
<td style="padding:10px 0;color:#FFFFFF;font-size:14px;">
    {subject}
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
    color:#E942DC;
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

</td>
</tr>

<tr>
<td style="
    padding:20px 32px;
    border-top:1px solid #252833;
    color:#62687A;
    font-size:11px;
">
    Mistli · Support
</td>
</tr>

</table>

</td>
</tr>

</table>

</body>
</html>
"""

    return mail_subject, text, html


async def send_support_email(data: SupportRequest):

    subject, text, html = build_support_email(data)

    return await send_email_mailgun(
        subject=subject,
        text=text,
        html=html,
        reply_to=str(data.email),
    )