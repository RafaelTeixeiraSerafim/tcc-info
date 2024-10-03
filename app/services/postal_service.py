import requests
from flask import jsonify, request

def postal_service(postalCode: str):
    response = requests.get(f'https://viacep.com.br/ws/{postalCode}/json/')
    print(response)
    data = response.json()
    print(data)

    if data.get("erro"):
        raise Exception("Postal code not found")

    return {
        "postalCode": data.get("cep"),
        "state": data.get("estado"),
        "city": data.get("localidade"),
        "neighbourhood": data.get("bairro"),
        "street": data.get("logradouro"),
    }