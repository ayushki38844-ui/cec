from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Capital Electronics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequirementNote(BaseModel):
    name: str = ""
    email: str = ""
    requirements: str

@app.post("/api/requirements")
async def save_requirement(note: RequirementNote):
    print(f"Received requirement note from {note.name} ({note.email}): {note.requirements}")
    return {"status": "success", "message": "Our team will contact you super soon!"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
