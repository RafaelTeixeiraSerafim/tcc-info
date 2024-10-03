from flask import jsonify, request
from app.services.address_service import get_addresses, create_address, get_address, update_address, delete_address

def get_addresses_controller():
    try:
        user_id = request.args.get("userId", -1, type=int)

        if user_id == -1:
                return jsonify({"message": "Missing one or more required parameters"}), 400
        
        addresses = get_addresses(user_id)
        
        return jsonify(addresses)
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def post_address_controller():
    try:
        data = request.get_json()

        create_address(data)

        return jsonify({'message': 'Address created successfully'}), 201
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def get_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400

        address = get_address(address_id)

        return jsonify(address.to_dict())
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def update_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400

        data = request.get_json()

        update_address(address_id, data)

        return jsonify({'message': 'Address updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'{str(e)}'}), 500

def delete_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400
        
        delete_address(address_id)

        return jsonify({'message': 'Address deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'{str(e)}'}), 500
    