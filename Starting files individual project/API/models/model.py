from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional

class SeasonalProduce(BaseModel):
    id: int
    name: str
    season: str
    price_per_kg: float
    availability: str
    description: str
    created_at: Optional[datetime] = datetime.now()

class Event(BaseModel):
    id: int
    name: str
    event_date: date
    event_time: str
    description: str
    location: str
    created_at: Optional[datetime] = datetime.now()

class ContactFormSubmission(BaseModel):
    name: str
    email: str
    message: str