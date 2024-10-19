from flask import jsonify, request
from app.services import address_service

def get_addresses_controller():
    try:
        user_id = request.args.get("userId", -1, type=int)
        postal_code = request.args.get("postalCode", "", type=str)

        if user_id == -1:
                return jsonify({"message": "Missing one or more required parameters"}), 400
        
        addresses = address_service.get_addresses(user_id)
        
        return jsonify(addresses)
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def post_address_controller():
    try:
        data = request.get_json()

        address_service.create_address(data)

        return jsonify({'message': 'Address created successfully'}), 201
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def get_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400

        address = address_service.get_address(address_id)

        return jsonify(address.to_dict())
    except Exception as e:
        return jsonify({"message": f'{str(e)}'}), 500

def update_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400

        data = request.get_json()

        address_service.update_address(address_id, data)

        return jsonify({'message': 'Address updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'{str(e)}'}), 500

def delete_address_controller(address_id: int):
    try:
        if not address_id:
            return jsonify({"message": "Missing identifier for operation"}), 400
        
        address_service.delete_address(address_id)

        return jsonify({'message': 'Address deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'{str(e)}'}), 500
    
def get_address_by_postal_code_controller(postal_code: str):
    try:
        if not postal_code or len(postal_code) != 8:
            return jsonify({"message": "Invalid postal code format"}), 400
    
        address = address_service.get_address_by_postal_code(postal_code)
        return jsonify(address)
    except Exception as e:
        return jsonify({"error": f'{str(e)}'}), 500