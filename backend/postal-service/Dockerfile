FROM python:3.11-alpine

COPY wsgi.py wsgi.py

COPY requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --no-cache-dir -r requirements.txt

COPY ./app .

WORKDIR /

CMD gunicorn --bind [::]:5000 wsgi:app