# **Setup Documentation for Supermarket Comparison (Firefox Extension)**

This document will guide you through the setup process for deploying the **Grocery Comparator App** Firefox extension. The extension allows users to compare grocery prices from various supermarkets directly in their browser.

---

## **Prerequisites:**

Before starting the setup, ensure you have the following installed:

### **Firefox Development Requirements:**
- **Mozilla Firefox** (latest version)
- **Firefox Developer Edition** (optional but recommended for testing)
- **WebExtension APIs**: Used for building Firefox extensions (covered in this guide)
- **Node.js** (for development and packaging)
- **npm** or **yarn** (for package management)

---

## **Step 1: Clone the Repository**

Start by cloning the repository for the Firefox extension:

```bash
# Clone the project repo
git clone https://github.com/yourusername/grocery-comparator-app.git
```

---

## **Step 2: Set Up the Firefox Extension**

### **2.1. Navigate to the Firefox Extension Directory**

Go to the extension directory inside your project:

```bash
cd grocery-comparator-app/firefox-extension
```

### **2.2. Install Dependencies**

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### **2.3. Update API URL**

- **`grocery-comparator-app/firefox-extension/src/api.js`**:
  - Update the base URL to point to your backend API (same as your website or mobile app).
  - Example:

  ```javascript
  const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend API URL
  ```

  This should match the backend URL configured for your Flask app.

---

## **Step 3: Develop and Test the Firefox Extension**

### **3.1. Load the Extension in Firefox**

1. Open **Mozilla Firefox** and type `about:debugging` in the address bar.
2. Click on **This Firefox** (or **Load Temporary Add-on** for older versions).
3. Click **Load Temporary Add-on** and select the **manifest.json** file located in `grocery-comparator-app/firefox-extension/`.
   
   This will load the extension temporarily, allowing you to test it.

### **3.2. Test the Extension**

- After loading the extension, you should see the **Grocery Comparator** icon in your browser toolbar.
- Click on the icon to open the extension popup, where you can search for products and compare prices from different supermarkets.

Make sure the following features are working:

- **User Authentication**: Test logging in and signing up using the backend API.
- **Price Comparison**: Ensure that the extension fetches prices from various sources via the backend API.
- **Basket Management**: Make sure that users can add and remove items from the basket.

### **3.3. Debugging the Extension**

To debug the extension:

1. Open the **Developer Tools** by pressing `F12` in Firefox.
2. Go to the **Console** tab to see any errors or logs related to the extension.
3. Use the **Inspector** tab to inspect elements within the extension's popup.
   
You can modify the source code in `grocery-comparator-app/firefox-extension/src/` to make changes and see the results instantly.

---

## **Step 4: Customize the Extension**

You may need to edit or configure several files to customize the extension for your needs.

### **4.1. UI Customizations**

- **`grocery-comparator-app/firefox-extension/src/components/`**: 
  - Modify UI components like `Popup.js`, `SearchResults.js`, `ProductItem.js`, etc., to change the extension’s appearance or functionality.
  - You can also edit the styles in **`grocery-comparator-app/firefox-extension/src/styles/`** to fit your brand.

### **4.2. Add New Stores/Scraping Sources**

If you want to add additional supermarkets or scraping sources:
- Modify the scraping logic in **`backend/services/scraperService.py`**.
- Ensure that the backend API is updated with new product categories or store routes.
- Update the extension’s **`api.js`** to handle any new endpoints or requests related to these sources.

### **4.3. Handle API Responses**

You can edit the logic that handles API responses in **`grocery-comparator-app/firefox-extension/src/api.js`** to fit the new data format, error handling, or request parameters.

---

## **Step 5: Package the Extension**

Once you are satisfied with the extension's functionality and design, you can package it for distribution.

### **5.1. Create the Final Package**

To create the final ZIP file that you can submit to the Firefox Add-ons Marketplace, do the following:

1. Ensure that the **manifest.json** and all necessary files are in the root of the `grocery-comparator-app/firefox-extension/` directory.
2. Zip the contents of the `grocery-comparator-app/firefox-extension/` directory (not the directory itself).
   
   Use a command like the following:

   ```bash
   zip -r grocery-comparator-extension.zip *
   ```

3. This will create a ZIP file that contains your extension.

### **5.2. Submit to Mozilla Add-ons Marketplace**

1. Go to the [Mozilla Add-ons Developer Hub](https://addons.mozilla.org/en-US/developers/).
2. Log in with your Firefox account.
3. Click on **Submit a New Add-on** and follow the prompts to upload the `.zip` file you created in step 5.1.
4. After submission, Mozilla will review the extension before it gets published.

---

## **Step 6: Troubleshooting & Debugging**

If you encounter issues, follow these steps to debug:

### **6.1. Check the Firefox Logs**
Open **Developer Tools** (`F12`), and check the **Console** tab for any issues or errors in the extension.

### **6.2. Extension Not Working**
- Ensure that the backend API is up and running and accessible from your Firefox browser.
- Check the `API_BASE_URL` in **`grocery-comparator-app/firefox-extension/src/api.js`** and ensure it's set to the correct URL.

### **6.3. Check Network Requests**
You can inspect network requests by opening **Network** tab in **Developer Tools** and verifying that the extension is making the correct API calls.

---
