import requests

def test_controller():
    response = requests.get(f"http://main-backend.railway.internal:8080/api/v1/products")

    if response.status_code == 200:
        print("Response from main-service:", response.json())
        return response.json()
    else:
        print("Request failed with status:", response.status_code)
        return {"error", response.reason}