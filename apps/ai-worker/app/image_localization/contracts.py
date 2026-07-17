"""Contracts for stateless image-localization providers."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ImageLocalizationRequest:
    """The source image and instructions passed to an image provider."""

    image_bytes: bytes
    mime_type: str
    model: str
    source_language: str | None
    target_language: str
    context: str


@dataclass(frozen=True)
class LocalizedText:
    """An editable translated text region in canvas pixel coordinates."""

    x: float
    y: float
    width: float
    height: float
    text: str
    original_text: str
    text_align: str
    stroke_color: str
    line_width: int
    fill_color: str
    font: str
    add_font_background: bool
    add_font_border: bool
    add_background_color: str
    rotation: float
    angle: float
    layout: str
    text_dir: str

    def to_public_contract(self) -> dict[str, str | float | int | bool]:
        """Maps the internal region to the public stateless API format."""
        return {
            "x": self.x,
            "y": self.y,
            "width": self.width,
            "height": self.height,
            "text": self.text,
            "originalText": self.original_text,
            "textAlign": self.text_align,
            "strokeColor": self.stroke_color,
            "lineWidth": self.line_width,
            "fillColor": self.fill_color,
            "font": self.font,
            "addFontBackground": self.add_font_background,
            "addFontBorder": self.add_font_border,
            "addBackgroundColor": self.add_background_color,
            "rotation": self.rotation,
            "angle": self.angle,
            "layout": self.layout,
            "textDir": self.text_dir,
        }


@dataclass(frozen=True)
class ImageLocalizationResult:
    """Provider output that can be returned directly to the editor."""

    image_data_url: str
    inpainted_data_url: str
    context: str
    text: tuple[LocalizedText, ...]

    def to_public_contract(self) -> dict[str, object]:
        """Returns the stable stateless editor response contract."""
        return {
            "image": self.image_data_url,
            "inpainted": self.inpainted_data_url,
            "context": self.context,
            "text": [item.to_public_contract() for item in self.text],
        }
