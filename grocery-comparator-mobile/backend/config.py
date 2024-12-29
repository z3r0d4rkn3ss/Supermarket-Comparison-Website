import os

class Config:
    """Base config class."""
    # Database Configuration (use environment variables for sensitive info)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Default secret key for session and CSRF protection
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-default-secret-key')

    # Read database URI from environment variable, or use a default for development
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://user:password@localhost/dbname')

    # Example of other useful configurations
    DEBUG = os.environ.get('FLASK_DEBUG', False)
    TESTING = os.environ.get('FLASK_TESTING', False)


class DevelopmentConfig(Config):
    """Development-specific configurations."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL', 'postgresql://dev_user:dev_password@localhost/dev_db')

class TestingConfig(Config):
    """Testing-specific configurations."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL', 'postgresql://test_user:test_password@localhost/test_db')

class ProductionConfig(Config):
    """Production-specific configurations."""
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://prod_user:prod_password@localhost/prod_db')
    DEBUG = False
    LOGGING_LEVEL = 'ERROR'


# Here we can set the default configuration to Development for local testing
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}

# Set default configuration mode
app_config = os.environ.get('FLASK_ENV', 'development')
