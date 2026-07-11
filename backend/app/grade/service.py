"""
©AngelaMos | 2026
service.py
"""

from functools import lru_cache

from google import genai
from google.genai import types
from google.genai.errors import APIError

from config import settings
from core.exceptions import BaseAppException
from .rubric import SYSTEM_INSTRUCTION, USER_PROMPT
from .schemas import GradeResult


class GradeUnavailableError(BaseAppException):
    """
    Raised when the grader has no usable vision-model configuration.
    """
    def __init__(self) -> None:
        super().__init__(
            message = "The grader is not configured. Set GEMINI_API_KEY.",
            status_code = 503,
        )


class GradeModelError(BaseAppException):
    """
    Raised when the vision model fails to return a usable critique.
    """
    def __init__(self) -> None:
        super().__init__(
            message = "The vision model could not grade this slide. Try another image.",
            status_code = 502,
        )


@lru_cache
def _client() -> genai.Client:
    """
    One shared Gemini client. Cached so we build the transport once.
    """
    key = settings.GEMINI_API_KEY.get_secret_value() if settings.GEMINI_API_KEY else ""
    if not key:
        raise GradeUnavailableError()
    return genai.Client(api_key = key)


async def grade_slide(image_bytes: bytes, mime_type: str) -> GradeResult:
    """
    Send one slide to Gemini and return the structured critique.
    """
    client = _client()

    try:
        response = await client.aio.models.generate_content(
            model = settings.GEMINI_MODEL,
            contents = [
                USER_PROMPT,
                types.Part.from_bytes(data = image_bytes, mime_type = mime_type),
            ],
            config = types.GenerateContentConfig(
                system_instruction = SYSTEM_INSTRUCTION,
                response_mime_type = "application/json",
                response_schema = GradeResult,
                temperature = 0.4,
                max_output_tokens = 4096,
            ),
        )
    except APIError as exc:
        raise GradeModelError() from exc

    parsed = response.parsed
    if not isinstance(parsed, GradeResult):
        raise GradeModelError()

    return parsed
