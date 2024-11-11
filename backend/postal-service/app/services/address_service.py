from app.models.address import Address
from app.database import db
import requests

def get_addresses(user_id: int) -> list[dict]:
    data: list[Address] = Address.query.filter(Address.user_id == user_id).all()

    return [address.to_dict() for address in data]

def get_active_addresses(user_id: int) -> list[dict]:
    data: list[Address] = Address.query.filter(Address.user_id == user_id and Address.deactivated != True).all()

    return [address.to_dict() for address in data]

def create_address(data: dict):
    address = Address(
                data["userId"],
                data["fullName"],
                data["postalCode"],
                data["state"],
                data["city"],
                data["neighbourhood"],
                data["street"],
                data["houseNumber"],
                data["apartmentNumber"],
                data["contactPhone"],
                data.get("deactivated")
            )
    db.session.add(address)
    db.session.commit()

def get_address(address_id: int):
    address: Address = Address.query.get(address_id)

    if not address:
        raise Exception(f'Address with id {address_id} not found')
    
    return address

def update_address(address_id: int, data: dict):
    address: Address = Address.query.get(address_id)

    if not address:
        raise Exception(f'Address with id {address_id} not found')

    address.full_name = data.get("fullName", address.full_name)
    address.postal_code = data.get("postalCode", address.postal_code)
    address.state = data.get("state", address.state)
    address.city = data.get("city", address.city)
    address.neighbourhood = data.get("neighbourhood", address.neighbourhood)
    address.street = data.get("street", address.street)
    address.house_number = data.get("houseNumber", address.house_number)
    address.apartment_number = data.get("apartmentNumber", address.apartment_number)
    address.contact_phone = data.get("contactPhone", address.contact_phone)

    db.session.commit()

def delete_address(address_id: int):
    address = Address.query.get(address_id)
        
    if not address:
        raise Exception(f'Address with id {address_id} not found')

    db.session.delete(address)
    db.session.commit()

def deactivate_address(address_id: int):
    address: Address = Address.query.get(address_id)
        
    if not address:
        raise Exception(f'Address with id {address_id} not found')
    
    address.deactivated = True

    db.session.commit()

def get_address_by_postal_code(postal_code):
    response = requests.get(f'https://viacep.com.br/ws/{postal_code}/json/')
    data = response.json()

    if data.get("erro"):
        raise Exception("Postal code not found")

    return {
        "postalCode": data.get("cep"),
        "state": data.get("estado"),
        "city": data.get("localidade"),
        "neighbourhood": data.get("bairro"),
        "street": data.get("logradouro"),
    }