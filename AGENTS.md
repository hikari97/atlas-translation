# Atlas Studio

Atlas Studio is an AI Comic Localization Platform.

## Mission

Build a production-ready comic localization platform.

Never generate temporary solutions.

Always prioritize maintainability.

---

## Architecture

The architecture is documented inside

/docs/ARCHITECTURE.md

Always follow it.

Never invent another architecture.

---

## Coding Rules

Language

- TypeScript Strict
- Python 3.12

Frontend

- Next.js
- Chakra UI
- Konva
- Redux
- TanStack Query v5

Backend

- Express
- MongoDB

AI

- FastAPI
- PaddleOCR
- OpenCV

---

## Never

Never use

- any
- inline styles
- duplicated logic
- magic numbers
- giant files

---

## Always

Always

- create reusable components
- split business logic
- create types
- document public methods
- write clean code

---

## Git

One feature = one commit.

Never modify unrelated files.

---

## Editor

The editor uses

Command Pattern.

Never mutate editor state directly.

All modifications must be Commands.

---

## Data

Canvas is only renderer.

JSON is source of truth.

Never store editor state inside Konva.

---

## Plugin

Everything should be extensible.

Never hardcode AI providers.

Always use plugin interface.
