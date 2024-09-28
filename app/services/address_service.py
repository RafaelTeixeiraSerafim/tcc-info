from flask import jsonify, request
from app.models.address import Address
from app.database import db

def address_service():
    if request.method == "GET":
        userId = request.args.get("userId", -1, type=int)

        if userId == -1:
            return jsonify({"message": "Missing one or more required parameters"})

        data: list[Address] = Address.query.filter(Address.user_id == userId).all()

        addresses = [address.to_dict() for address in data]
        return jsonify(addresses)
    elif request.method == "POST":
        try:
            data = request.get_json()
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
                        data["contactPhone"]
                    )
            db.session.add(address)
            db.session.commit()

            return jsonify({'message': 'Address created successfully'}), 200
        except Exception as e:
            return jsonify({"message": f'{str(e)}'}), 500
        