from app.controllers.address_controller import get_addresses_controller, post_address_controller, get_address_controller, update_address_controller, delete_address_controller, get_address_by_postal_code_controller

def address_routes(app):
    app.route("/api/v1/addresses", methods=["GET"])(get_addresses_controller)
    app.route("/api/v1/addresses", methods=["POST"])(post_address_controller)
    app.route("/api/v1/addresses/<int:address_id>", methods=["GET"])(get_address_controller)
    app.route("/api/v1/addresses/<int:address_id>", methods=["PUT"])(update_address_controller)
    app.route("/api/v1/addresses/<int:address_id>", methods=["DELETE"])(delete_address_controller)
    app.route("/api/v1/addresses/postal-code/<postal_code>", methods=["GET"])(get_address_by_postal_code_controller)