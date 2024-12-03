from py_eureka_client import eureka_client

def test_controller():
    response = eureka_client.do_service(
        app_name="main-service",              # Logical name of the target service
        service="/api/v1/products",      # Path you want to request
        return_type="json"                    # Specify return type (e.g., 'json', 'text', or 'raw')
    )

    if response:
        print("Response from main-service:", response)
        return response
    else:
        print("Failed to get response from main-service")
        return {"error": "erro :("}