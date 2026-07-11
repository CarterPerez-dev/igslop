"""
©AngelaMos | 2026
schemas.py
"""

from enum import Enum

from pydantic import BaseModel, Field


class Verdict(str, Enum):
    POSTER = "POSTER"
    NEWSPAPER = "NEWSPAPER"
    SLOP = "SLOP"


class Severity(str, Enum):
    CRITICAL = "CRITICAL"
    MODERATE = "MODERATE"
    MINOR = "MINOR"


class AxisKey(str, Enum):
    FOCAL = "FOCAL"
    HIERARCHY = "HIERARCHY"
    SPACE = "SPACE"
    RESTRAINT = "RESTRAINT"
    COLOR = "COLOR"
    TYPE = "TYPE"


class AxisScore(BaseModel):
    key: AxisKey
    label: str = Field(description = "Short human label for the axis")
    score: int = Field(ge = 0, le = 100)
    note: str = Field(description = "One concrete sentence on what this slide does on this axis")


class Tell(BaseModel):
    name: str = Field(description = "Short name of the mechanical AI tell detected")
    severity: Severity
    evidence: str = Field(description = "What in the slide gives it away, in one sentence")


class GradeResult(BaseModel):
    """
    The structured critique returned by the vision model. Doubles as the
    response schema handed to Gemini and the payload returned to the client.
    """
    verdict: Verdict
    overall_score: int = Field(ge = 0, le = 100)
    headline_read: str = Field(
        description = "The single line the slide is trying to communicate, in the grader's own words"
    )
    axes: list[AxisScore] = Field(
        description = "Exactly six axes in this order: FOCAL, HIERARCHY, SPACE, RESTRAINT, COLOR, TYPE"
    )
    tells: list[Tell] = Field(
        description = "Every mechanical AI/template tell detected, most severe first; empty list if genuinely clean"
    )
    fixes: list[str] = Field(
        description = "Concrete specific-diff edits ordered by impact, each a single imperative sentence"
    )
    one_thing: str = Field(
        description = "The single highest-leverage change to make first"
    )


class GradeError(BaseModel):
    detail: str
    type: str
