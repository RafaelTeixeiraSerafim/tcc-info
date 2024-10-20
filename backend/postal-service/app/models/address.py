from app.database import db
from datetime import datetime, timezone

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
    full_name = db.Column(db.String(200), unique=False, nullable=False)
    postal_code = db.Column(db.String(20), unique=False, nullable=False)
    state = db.Column(db.String(50), unique=False, nullable=False)
    city = db.Column(db.String(200), unique=False, nullable=False)
    neighbourhood = db.Column(db.String(1000), unique=False, nullable=False)
    street = db.Column(db.String(200), unique=False, nullable=False)
    house_number = db.Column(db.String(200), unique=False, nullable=True)
    apartment_number = db.Column(db.String(200), unique=False, nullable=True) # Complemento
    contact_phone = db.Column(db.String(200), unique=False, nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc), nullable=False)

    def __init__(self, user_id, full_name, postal_code, state, city, neighbourhood, street, house_number, apartment_number, contact_phone):
        self.user_id = user_id
        self.full_name = full_name
        self.postal_code = postal_code
        self.state = state
        self.city = city
        self.neighbourhood = neighbourhood
        self.street = street
        self.house_number = house_number
        self.apartment_number = apartment_number
        self.contact_phone = contact_phone

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "fullName": self.full_name,
            "postalCode": self.postal_code,
            "state": self.state,
            "city": self.city,
            "neighbourhood": self.neighbourhood,
            "street": self.street,
            "houseNumber": self.house_number,
            "apartmentNumber": self.apartment_number,
            "contactPhone": self.contact_phone
        }