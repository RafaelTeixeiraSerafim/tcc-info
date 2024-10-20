from flask import jsonify, request
from app.services import shipping_service

def calculate_shipping_controller():
    try:
        data = request.get_json()

        shipping_list = shipping_service.calculate_shipping_service(data)
        return jsonify({"options": shipping_list})
    except Exception as e:
        return jsonify({"error": f'{str(e)}'}), 500