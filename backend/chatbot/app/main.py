import json
from typing import Literal

from app.config import MAILGUN_TO
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from langchain_core.messages import (
    HumanMessage,
    AIMessage,
    SystemMessage,
    ToolMessage,
)

from app.agent import agent

from app.routes.forms import router as forms_router

app = FastAPI(
    title="AI Assistant API and backend MISTLI",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "https://mistli.com.mx",
        "https://www.mistli.com.mx",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# MODELOS
# ============================================================

class ChatMessage(BaseModel):

    role: Literal[
        "user",
        "assistant",
        "system",
    ]

    content: str


class ChatRequest(BaseModel):

    messages: list[ChatMessage]


# ============================================================
# CONVERTIR MENSAJES
# ============================================================

def convert_messages(messages):

    result = []

    for message in messages:

        if message.role == "user":

            result.append(
                HumanMessage(
                    content=message.content
                )
            )

        elif message.role == "assistant":

            result.append(
                AIMessage(
                    content=message.content
                )
            )

        elif message.role == "system":

            result.append(
                SystemMessage(
                    content=message.content
                )
            )

    return result


# ============================================================
# SSE
# ============================================================

def sse_event(
    event_type: str,
    data,
):

    payload = {
        "type": event_type,
        "data": data,
    }

    return (
        f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
    )


# ============================================================
# CHAT STREAM
# ============================================================

async def chat_stream(messages):

    langchain_messages = convert_messages(
        messages
    )

    try:

        async for chunk, metadata in agent.astream(
            {
                "messages": langchain_messages
            },
            stream_mode="messages",
        ):

            # --------------------------------------------
            # TOOL MESSAGE
            # --------------------------------------------

            if isinstance(
                chunk,
                ToolMessage
            ):

                yield sse_event(
                    "tool_result",
                    {
                        "tool": chunk.name,
                        "content": chunk.content,
                    },
                )

                continue

            # --------------------------------------------
            # AI MESSAGE
            # --------------------------------------------

            if isinstance(
                chunk,
                AIMessage
            ):

                # ----------------------------------------
                # TEXTO
                # ----------------------------------------

                if isinstance(
                    chunk.content,
                    str
                ):

                    if chunk.content:

                        yield sse_event(
                            "token",
                            chunk.content,
                        )

                # ----------------------------------------
                # TOOL CALL
                # ----------------------------------------

                if chunk.tool_calls:

                    for tool_call in chunk.tool_calls:

                        yield sse_event(
                            "tool_call",
                            {
                                "name": tool_call["name"],
                                "args": tool_call["args"],
                            },
                        )

        yield sse_event(
            "done",
            {
                "status": "completed"
            },
        )

    except Exception as error:

        yield sse_event(
            "error",
            {
                "message": str(error)
            },
        )


# ============================================================
# ENDPOINT
# ============================================================
@app.get("/api/test")
async def test(testnum: int = 0):
    from functions.functionsCalendar import check_calendar_availability_2, create_calendar_event_2 
    from functions.functionsMailgun import send_chat_history_by_email_2,send_email_mailgun

    if testnum == 1:
        # Test check_calendar_availability
        availability = await check_calendar_availability_2(
            start="2026-10-06T10:00:00",
            end="2026-10-06T11:00:00"
        )
        return {
            "status": "ok",
            "availability": availability,
        }
    elif testnum == 2:
        # Test create_calendar_event
        event = await create_calendar_event_2(
            title="Test Event",
            start="2026-10-06T10:00:00",
            end="2026-10-06T11:00:00",
            attendee_email="fercienciaypagos@gmail.com",
            description="This is a test event.",
            location="Online"
        )
        return {
            "status": "ok",
            "event": event,
        }
    elif testnum == 3:
        # Test send_chat_history_by_email
        email_result = await send_chat_history_by_email_2(
            chat_history="This is a test chat history.",
            recipient="fercienciaypagos@gmail.com")
        return {
            "status": "ok",
            "email_result": email_result,
        }
    elif testnum == 4:
        # Test send_email_mailgun
        email_result = await send_email_mailgun(
            subject="Test Email",
            text="This is a test email.",
            html="<p>This is a test email.</p>",
            reply_to=MAILGUN_TO
        )
        return {
            "status": "ok",
            "email_result": email_result,
        }

@app.post("/api/chat")
async def chat(request: ChatRequest):

    return StreamingResponse(
        chat_stream(
            request.messages
        ),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# ============================================================
# HEALTH
# ============================================================

@app.get("/api/health")
async def health():

    return {
        "status": "ok"
    }

app.include_router(forms_router)
