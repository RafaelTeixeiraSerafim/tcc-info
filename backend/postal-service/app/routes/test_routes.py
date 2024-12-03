from app.controllers.test_controller import test_controller

def test_routes(app):
    app.route("/api/v1/test")(test_controller)