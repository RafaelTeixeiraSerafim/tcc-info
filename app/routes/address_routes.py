from app.services.address_service import address_service

def address_routes(app):
    @app.route("/api/v1/addresses", methods=["GET", "POST"])
    def get_addresses():
        return address_service()