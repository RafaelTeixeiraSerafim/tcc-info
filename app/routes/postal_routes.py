from app.services.postal_service import postal_service
from flask import jsonify

def postal_routes(app):
    @app.route("/api/v1/postal/<postalCode>")
    def get_postal(postalCode: str):
        print(postalCode)
        if not postalCode or len(postalCode) != 8:
            return jsonify({"message": "Invalid postal code format"}), 400
        
        try:
            address = postal_service(postalCode)
            return jsonify(address)
        except Exception as e:
            return jsonify({"error": f'{str(e)}'})