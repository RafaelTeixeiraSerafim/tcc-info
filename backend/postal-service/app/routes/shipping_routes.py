from app.controllers.shipping_controller import calculate_shipping_controller

def shipping_routes(app):
    app.route("/api/v1/shipping/calculate", methods=["POST"])(calculate_shipping_controller)