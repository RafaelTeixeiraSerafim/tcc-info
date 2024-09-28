from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(port=int(app.config.get('FLASK_RUN_PORT', 5000)), debug=app.config.get('FLASK_DEBUG', True), host='localhost')