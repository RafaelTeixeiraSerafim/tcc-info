from flask import jsonify
import requests
import os

def calculate_shipping_service(data: dict) -> list:
    url = "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate"

    headers = {
        "Authorization": f"Bearer {os.getenv('MELHOR_ENVIO_TOKEN')}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # Raises an error for 4xx/5xx status codes
        data: list[dict] = response.json()  # Return the response as JSON

        shipping_list = []
        for shipping in data:
            if shipping.get("error"): continue

            shipping_list.append({
                "id": shipping["id"],
                "name": shipping["name"],
                "price": shipping["price"],
                "deliveryTime": shipping["delivery_time"]
            })
            
        return shipping_list
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except Exception as err:
        print(f"An error occurred: {err}")
