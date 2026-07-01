# Atlas Studio API Specification v1.0

## API Version

Version: v1

Base URL

Development

http://localhost:3001/api/v1

Production

https://api.atlasstudio.ai/api/v1

---

# Authentication

JWT Bearer Token

Header

Authorization: Bearer <token>

---

# Standard Response

Success

{
"success": true,
"message": "Success",
"data": {}
}

Failed

{
"success": false,
"message": "Validation Error",
"errors": []
}

---

# Error Code

200 OK

201 Created

400 Validation Error

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Unprocessable Entity

429 Too Many Requests

500 Internal Server Error

---

# MODULE : AUTH

POST /auth/login

Description

Login user.

Request

{
"email":"string",
"password":"string"
}

Response

{
"success":true,
"data":{
"accessToken":"",
"refreshToken":"",
"user":{}
}
}

---

POST /auth/register

Request

{
"name":"string",
"email":"string",
"password":"string"
}

---

POST /auth/refresh

---

POST /auth/logout

---

GET /auth/profile

---

# MODULE : PROJECT

GET /projects

Description

Get all projects.

---

POST /projects

Request

{
"name":"Solo Leveling",
"description":""
}

---

GET /projects/{projectId}

---

PATCH /projects/{projectId}

---

DELETE /projects/{projectId}

---

POST /projects/import

multipart/form-data

file

---

POST /projects/{projectId}/export

{
"format":"atlas"
}

---

# MODULE : PAGE

GET /projects/{projectId}/pages

---

POST /projects/{projectId}/pages

multipart/form-data

image

---

PATCH /pages/{pageId}

---

DELETE /pages/{pageId}

---

# MODULE : BUBBLE

GET /pages/{pageId}/bubbles

---

POST /pages/{pageId}/bubbles

{
"polygon":[]
}

---

PATCH /bubbles/{bubbleId}

---

DELETE /bubbles/{bubbleId}

---

POST /bubbles/{bubbleId}/split

---

POST /bubbles/{bubbleId}/merge

---

POST /bubbles/{bubbleId}/translate

{
"targetLanguage":"id",
"promptId":""
}

---

# MODULE : OCR

POST /ocr/page

Request

multipart/form-data

image

plugin

Response

{
"jobId":""
}

---

POST /ocr/selection

Request

{
"pageId":"",
"polygon":[]
}

---

GET /ocr/jobs/{jobId}

---

# MODULE : DETECTION

POST /detection/bubble

---

POST /detection/text

---

POST /detection/layout

---

# MODULE : TRANSLATION

POST /translation/page

{
"pageId":"",
"targetLanguage":"id",
"bubbleOnly":true
}

---

POST /translation/selection

---

POST /translation/bubble

---

POST /translation/review

---

POST /translation/retry

---

# MODULE : RENDER

POST /render/page

---

POST /render/bubble

---

POST /render/preview

---

# MODULE : INPAINT

POST /inpaint/page

---

POST /inpaint/selection

---

POST /inpaint/brush

---

# MODULE : EXPORT

POST /export/png

---

POST /export/webp

---

POST /export/pdf

---

POST /export/atlas

---

# MODULE : GLOSSARY

GET /glossaries

POST /glossaries

PATCH /glossaries/{id}

DELETE /glossaries/{id}

---

# MODULE : CHARACTER

GET /characters

POST /characters

PATCH /characters/{id}

DELETE /characters/{id}

---

# MODULE : PROMPT

GET /prompts

POST /prompts

PATCH /prompts/{id}

DELETE /prompts/{id}

POST /prompts/test

---

# MODULE : WORKFLOW

GET /workflows

POST /workflows

PATCH /workflows/{id}

DELETE /workflows/{id}

POST /workflows/run

---

# MODULE : PLUGIN

GET /plugins

GET /plugins/installed

POST /plugins/install

POST /plugins/uninstall

PATCH /plugins/config

---

# MODULE : FONT

GET /fonts

POST /fonts/upload

DELETE /fonts/{id}

---

# MODULE : CREDIT

GET /credits

GET /credits/history

---

# MODULE : SETTINGS

GET /settings

PATCH /settings

---

# WebSocket Events

upload.progress

ocr.progress

bubble.progress

translation.progress

render.progress

workflow.progress

export.progress

job.completed

job.failed

---

# Async Jobs

OCR

Bubble Detection

Translation

Review

Rendering

Vision QA

Export

Semua proses di atas WAJIB asynchronous menggunakan Job Queue.

---

# API Rules

- Semua endpoint menggunakan versioning.
- Semua endpoint menggunakan JWT.
- Semua endpoint memiliki validasi request.
- Tidak boleh ada endpoint AI yang berjalan synchronous.
- Semua AI Process mengembalikan Job ID.
- Semua progress dikirim melalui WebSocket.
- Semua endpoint harus terdokumentasi menggunakan OpenAPI 3.1.
