from app.routes.postal_routes import postal_routes
from app.routes.address_routes import address_routes

def route_index(app):
    postal_routes(app)
    address_routes(app)