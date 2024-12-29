# **Setup Documentation for Supermarket Comparison (Python Application)**

This document will guide you through the setup process for deploying the **Grocery Comparator App** Python GUI application. The app provides users with the ability to compare grocery prices from different supermarkets via a desktop interface.

---

## **Prerequisites:**

Before starting the setup, ensure you have the following installed:

### **Python Development Requirements:**
- **Python** (version 3.7 or higher)
- **pip** (Python package installer)
- **Tkinter** (for creating the GUI, usually comes pre-installed with Python)
- **Virtual Environment** (optional but recommended to isolate dependencies)

---

## **Step 1: Clone the Repository**

Start by cloning the repository for the Python application:

```bash
# Clone the project repo
git clone https://github.com/yourusername/grocery-comparator-app.git
```

---

## **Step 2: Set Up the Python Application**

### **2.1. Navigate to the Python Application Directory**

Go to the Python application directory:

```bash
cd grocery-comparator-app/python-app
```

### **2.2. Create a Virtual Environment** (optional but recommended)

Creating a virtual environment ensures that dependencies are isolated from the rest of your system:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### **2.3. Install Dependencies**

Install the necessary dependencies using pip:

```bash
pip install -r requirements.txt
```

---

## **Step 3: Configure the Application**

The Python application will interact with the backend API to fetch grocery data. Make sure the API URL is correctly set in the configuration files.

### **3.1. Update the API Base URL**

- **`grocery-comparator-app/python-app/config.py`**:
  - Update the base URL to point to your backend API (this could be a local or production API).
  - Example:

  ```python
  API_BASE_URL = "http://localhost:5000/api"  # Update with your backend API URL
  ```

  This should match the backend URL where your Flask app or server is running.

---

## **Step 4: Run the Application**

### **4.1. Run the Python Application**

Once the dependencies are installed, you can run the Python GUI app with the following command:

```bash
python app.py
```

This will launch the **Grocery Comparator App** with a GUI for the user to interact with.

### **4.2. Using the GUI**

When the application starts, the main window will display:

- **Search Bar**: Allow users to enter the product they want to compare across supermarkets.
- **Compare Button**: Fetch and display price comparison results from different supermarkets.
- **Basket Button**: Show users their saved basket of products.
- **Settings**: Allows configuration of API endpoints or other settings.

Ensure that the app can properly call the backend API to get product prices and that the basket management is working as expected.

---

## **Step 5: Customize the Python Application**

You may need to edit or configure several files to tailor the app to your specific needs:

### **5.1. UI Customizations**

- **`grocery-comparator-app/python-app/ui.py`**:
  - Modify the Tkinter window layouts, buttons, labels, etc., to suit your design preferences.
  - For example, to change the window title or add new UI components:

  ```python
  root.title("Grocery Comparator")
  ```

- **`grocery-comparator-app/python-app/styles.css`**:
  - If you're using external CSS (for themes or styling), modify this file for UI customization.

### **5.2. Add New Supermarkets or Product Categories**

If you want to add additional supermarkets or update the existing product categories:

1. Modify the backend API to scrape or fetch product data from additional sources.
2. Update the API response structure and ensure the Python application can properly display the new data.
3. Update any relevant code in **`grocery-comparator-app/python-app/app.py`** to handle new categories or stores.

---

## **Step 6: Debugging & Troubleshooting**

If you encounter issues, follow these steps to debug:

### **6.1. Check Logs and Console Output**

The Python application logs important information to the console. Check for any error messages or warnings that can help you identify the problem.

### **6.2. API Connection Issues**

- Ensure that the backend API is up and running.
- Verify that the API base URL is correctly configured in **`config.py`**.
- Check the console for any connection errors when the Python app tries to access the backend API.

### **6.3. UI Issues**

- If the GUI is not rendering correctly, check for missing dependencies or issues with the Tkinter configuration.
- Ensure that all required widgets and frames are properly initialized and packed within the Tkinter window.

---

## **Step 7: Packaging the Application for Distribution**

To distribute the Python application as an executable file (for Windows, macOS, or Linux), you can package it using **PyInstaller** or similar tools.

### **7.1. Install PyInstaller**

```bash
pip install pyinstaller
```

### **7.2. Package the Application**

Run the following command to generate an executable file:

```bash
pyinstaller --onefile --windowed app.py
```

This will create a standalone executable file located in the `dist/` directory.

### **7.3. Distribute the Executable**

You can now distribute the generated executable file to users. They can run the application without needing to install Python or any dependencies.

---

## **Step 8: Troubleshooting & Debugging**

If you encounter issues during the setup or while running the app, consider the following:

### **8.1. Check for Missing Dependencies**

Make sure all dependencies are installed by running `pip install -r requirements.txt` again. If any dependencies fail to install, manually check the versions and compatibility.

### **8.2. Verify API Connection**

- Double-check the API URL configuration in **`config.py`** to ensure it's correct.
- If you're using a local backend, make sure it’s running on the specified port.

### **8.3. GUI Not Responding**

- Check if the Tkinter GUI is freezing or unresponsive. This may happen if there are blocking network calls.
- To fix this, ensure network calls (API requests) are run in a separate thread to avoid blocking the GUI.

---
