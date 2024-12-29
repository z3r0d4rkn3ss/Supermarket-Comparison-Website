import jwt
from datetime import datetime, timedelta
from flask import current_app, request, jsonify, abort
import os

# Secret key for encoding and decoding the JWT token, loaded from environment variables
SECRET_KEY = os.getenv("SECRET_KEY", "your-default-secret-key")

def encode_token(user_id):
    """
    Encodes the user ID into a JWT token.
    """
    payload = {
        'sub': user_id,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    """
    Decodes the JWT token and returns the user ID.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        abort(401, description="Token has expired")
    except jwt.InvalidTokenError:
        abort(401, description="Invalid token")

def require_auth(f):
    """
    A decorator to require authentication for certain routes.
    """
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header is None:
            return jsonify({"message": "Authorization header is missing"}), 401
        
        token = auth_header.split(" ")[1]  # Assuming "Bearer <token>"
        try:
            user_id = decode_token(token)
            request.user_id = user_id
        except Exception as e:
            return jsonify({"message": str(e)}), 401
        
        return f(*args, **kwargs)
    
    return wrapper
