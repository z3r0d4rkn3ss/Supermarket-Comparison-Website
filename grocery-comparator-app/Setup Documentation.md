# **Setup Documentation for Supermarket Comparison (Website)**

This document will guide you through the setup process of deploying the Grocery Comparator App (web application) to your system. This includes setting up the backend, frontend, and ensuring that everything is tailored to your specific needs, including required files to edit for your system.

---

## **Prerequisites:**

Before you begin, ensure you have the following installed:

### **Backend Requirements:**
- **Python 3.x** (preferably the latest stable version)
- **pip** (Python package installer)
- **MongoDB** or **PostgreSQL** (depending on the chosen database)
- **Flask** (Python framework)
- **Gunicorn** (WSGI server for Flask)
- **Scrapy** (for web scraping)
- **Flask-CORS** (for enabling CORS headers)

### **Frontend Requirements:**
- **Node.js** (v14.x or above)
- **npm** or **yarn** (for package management)
- **React.js** (for frontend)
- **Webpack** (if bundling is needed)
  
### **Database Setup:**
- **MongoDB** or **PostgreSQL** (as chosen in the backend setup)

---

## **Step 1: Clone the Repository**

Start by cloning the repository for both backend and frontend:

```bash
# Clone the project repo
git clone https://github.com/yourusername/grocery-comparator-app.git
```

---

## **Step 2: Set Up the Backend**

### **Backend Directory:**
Go to the backend directory of your project:

```bash
cd grocery-comparator-app/backend
```

### **2.1. Install Python Dependencies**

Install all necessary Python libraries by running the following command:

```bash
pip install -r requirements.txt
```

### **2.2. Edit Configuration Files**

- **`grocery-comparator-app/backend/config/dbConfig.py`**:
  - Update the database configuration file to point to your database.
  - If you are using MongoDB, the format is typically:
  
  ```python
  MONGO_URI = "mongodb://localhost:27017/your_database"
  ```
  
  - For PostgreSQL, you will need to set up your database connection strings, like so:
  
  ```python
  SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost:5432/your_database'
  ```

- **`.env`**: 
  - This file contains sensitive information like API keys and environment-specific settings.
  
  Example contents of `.env`:
  ```bash
  FLASK_ENV=development
  SECRET_KEY=your_secret_key
  DATABASE_URI=your_database_uri
  ```

Ensure to set your **Flask secret key**, **database URI**, and any other environment variables relevant to your setup.

### **2.3. Configure Scrapy (Optional)**

- If you're using Scrapy to scrape product prices, ensure that your **`scrapy`** settings in the **backend** (likely under `backend/services/scraperService.py`) are correctly configured for the supermarkets you're targeting.

---

## **Step 3: Set Up the Frontend**

### **Frontend Directory:**
Go to the frontend directory of your project:

```bash
cd grocery-comparator-app/frontend
```

### **3.1. Install Node.js Dependencies**

Install necessary dependencies for the React.js frontend:

```bash
npm install
```

If you use `yarn`, you can install dependencies using:

```bash
yarn install
```

### **3.2. Configure API Endpoints**

- **`grocery-comparator-app/frontend/src/services/priceComparisonService.js`**:
  - Update the base URL of your API to point to your backend API (the Flask server).
  - Example:

  ```javascript
  const API_BASE_URL = "http://localhost:5000/api"; // Replace with your backend API URL
  ```

- **`grocery-comparator-app/frontend/src/services/authService.js`**:
  - Modify the authentication API URL to match your backend’s routes.

  Example:
  
  ```javascript
  const API_URL = "http://localhost:5000/api/auth"; // For login, signup routes
  ```

### **3.3. Customize UI Elements (Optional)**

- If you need to change the UI (colors, text, branding), you can modify the styles in the **`frontend/src/styles/`** directory.

  For example:
  - **`App.css`** for global styles.
  - **`index.css`** for page-specific styles.

You can modify the components in **`src/components/`** to tailor the website design, such as the **Navbar.js**, **Results.js**, or **ProductList.js** components.

---

## **Step 4: Setting Up the Database**

### **4.1. Configure MongoDB/PostgreSQL**

- Ensure that MongoDB or PostgreSQL is installed and running.
  - If using **MongoDB**, run it locally by:

  ```bash
  mongod --dbpath=/path/to/data/db
  ```

  - If using **PostgreSQL**, ensure it is running on the configured port and accessible with the credentials provided in `dbConfig.py`.

### **4.2. Database Migrations (If Using SQL)**

If you are using PostgreSQL, run the migration scripts to set up the necessary tables:

```bash
# Run the migration script for PostgreSQL
python manage.py db upgrade
```

If you're using MongoDB, ensure that the collections (e.g., users, products, baskets) are created when the backend is first run.

---

## **Step 5: Running the Application**

### **5.1. Backend (Flask) Server**

To start the Flask backend server, run:

```bash
# Make sure you're in the backend directory
python run.py
```

The Flask server will now be running at `http://localhost:5000`.

### **5.2. Frontend (React) Development Server**

To start the frontend development server, run:

```bash
# Make sure you're in the frontend directory
npm start
```

The React app will now be running at `http://localhost:3000`.

### **5.3. Production Build (Optional)**

If you are deploying the app to production, you will want to build the React frontend for production:

```bash
npm run build
```

This will create a `build` directory with the production-ready files. You can then serve this via a static file server or integrate it into your Flask backend for deployment.

---

## **Step 6: Testing & Debugging**

- **Test the website**: Open `http://localhost:3000` in your browser to ensure the frontend is working.
- **Check the API**: Test the backend API by navigating to `http://localhost:5000/api` to check if the API endpoints are accessible.
- **Scraping**: Ensure the Scrapy service is fetching data correctly by checking the logs for errors.

---

## **Step 7: Deployment**

For deployment, you can use any of the following options:

### **7.1. Backend Deployment**

- **Heroku**: Easy deployment platform for Flask applications.
- **AWS EC2**: Set up a Flask application on an AWS EC2 instance.
- **DigitalOcean**: Set up Flask on a DigitalOcean droplet.

Make sure to update environment variables and configure the production-ready server using **Gunicorn**.

### **7.2. Frontend Deployment**

- **Netlify**: Deploy React apps for free.
- **Vercel**: Another platform for deploying React applications.
- **Heroku**: You can also host React apps via Heroku by setting up static file serving.

---

## **Step 8: Additional Configuration**

If you want to tailor the system further, such as adding new stores, modifying the UI, or customizing the scraper:

- **Backend API**: Add routes to handle more product categories or additional price comparison logic.
- **Scraper Configuration**: Add new supermarket scraping logic under **`backend/services/scraperService.py`**.
- **Frontend**: Modify React components under **`frontend/src/components/`** for new pages, UI elements, or features.

---
