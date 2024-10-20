from app.routes.address_routes import address_routes
from app.routes.shipping_routes import shipping_routes

def route_index(app):
    address_routes(app)
    shipping_routes(app)