"""
©AngelaMos | 2026
routes.py
"""

from fastapi import APIRouter, File, Request, Response, UploadFile

from config import settings
from core.exceptions import ValidationError
from core.rate_limit import limiter
from .schemas import GradeResult
from .service import grade_slide


router = APIRouter(prefix = "/grade", tags = ["grade"])

ALLOWED_MIME_TYPES = frozenset({"image/png", "image/jpeg", "image/webp"})
MAX_IMAGE_BYTES = 10 * 1024 * 1024


@router.post("", response_model = GradeResult)
@limiter.limit(settings.RATE_LIMIT_GRADE)
async def grade(
    request: Request,
    response: Response,
    slide: UploadFile = File(...),
) -> GradeResult:
    """
    Grade a single carousel slide against the 2026 poster rubric.
    """
    mime = (slide.content_type or "").lower()
    if mime not in ALLOWED_MIME_TYPES:
        raise ValidationError(
            "Upload a PNG, JPG, or WEBP slide.",
            field = "slide",
        )

    image_bytes = await slide.read()
    if not image_bytes:
        raise ValidationError("The uploaded file was empty.", field = "slide")
    if len(image_bytes) > MAX_IMAGE_BYTES:
        raise ValidationError("Slide is too large. Keep it under 10 MB.", field = "slide")

    return await grade_slide(image_bytes, mime)
