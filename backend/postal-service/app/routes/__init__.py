from app.routes.address_routes import address_routes
from app.routes.shipping_routes import shipping_routes
from app.routes.test_routes import test_routes

def route_index(app):
    address_routes(app)
    shipping_routes(app)
    test_routes(app)