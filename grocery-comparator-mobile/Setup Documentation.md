# **Setup Documentation for Supermarket Comparison (Mobile App - Android)**

This document will guide you through the setup process for deploying the **Grocery Comparator App** Android mobile application. The app allows users to compare grocery prices from various supermarkets and manage their shopping baskets.

---

## **Prerequisites:**

Before starting the setup, ensure you have the following installed:

### **Android Development Requirements:**
- **Android Studio** (latest version)
- **Java JDK** (version 11 or above)
- **Node.js** (latest LTS version)
- **npm** or **yarn** (for package management)
- **React Native CLI** (for running the app on Android)
  
### **Backend Requirements (API):**
- **Flask backend** with endpoints for price comparison and user authentication (make sure the backend is set up and running, as outlined in the website setup)

---

## **Step 1: Clone the Repository**

Start by cloning the repository for the mobile app:

```bash
# Clone the project repo
git clone https://github.com/yourusername/grocery-comparator-app.git
```

---

## **Step 2: Set Up the Mobile App**

### **2.1. Navigate to the Mobile App Directory**

Go to the mobile app directory inside your project:

```bash
cd grocery-comparator-app/mobile
```

### **2.2. Install React Native Dependencies**

Install the necessary dependencies for React Native:

```bash
npm install
```

or

```bash
yarn install
```

### **2.3. Update API URL**

- **`grocery-comparator-app/mobile/src/services/api.js`**:
  - Update the base URL to point to your backend API.
  - Example:

  ```javascript
  const API_BASE_URL = "http://localhost:5000/api"; // Update with your backend API URL
  ```

  This should match the backend URL configured for your Flask app (as discussed in the website setup).

---

## **Step 3: Android Setup**

### **3.1. Open the Project in Android Studio**

1. Open **Android Studio** and click on **Open an existing project**.
2. Navigate to the `grocery-comparator-app/mobile` folder and open it.

### **3.2. Set Up Android Device/Emulator**

- To test the app, you can either use a physical Android device or an Android emulator.
- If you're using a **physical device**, ensure that **USB Debugging** is enabled in the developer options on the device.
- If using an **emulator**, you can set it up within Android Studio.

### **3.3. Run the App on Android Device/Emulator**

In Android Studio, run the app by selecting the target device (either a physical device or emulator) and clicking the **Run** button (Green triangle).

Alternatively, you can run the app directly from the terminal using React Native commands:

```bash
npx react-native run-android
```

This will build the Android app and install it on the connected device/emulator.

---

## **Step 4: Customize the App**

You may need to edit or configure several files to customize the app to your needs.

### **4.1. UI Customizations**

- **`grocery-comparator-app/mobile/src/components/`**: 
  - Modify UI components like `ProductList.js`, `Basket.js`, `Navbar.js`, etc., to change the app’s appearance or functionality.
  - You can also edit the styles in **`grocery-comparator-app/mobile/src/styles/`** to fit your brand.

### **4.2. Add New Stores/Scraping Sources**

If you want to add additional supermarkets or scraping sources:
- Modify the scraping logic in **`backend/services/scraperService.py`**.
- Ensure that the backend API is updated with new product categories or store routes.

### **4.3. Handle API Responses**

You can edit the logic that handles API responses in **`grocery-comparator-app/mobile/src/services/api.js`** to fit the new data format, error handling, or request parameters.

---

## **Step 5: Testing the App**

Test the app on your Android device/emulator to ensure everything is working correctly.

- **Test the User Authentication**: Try signing up and logging in with valid credentials to ensure the API calls are working.
- **Test the Price Comparison**: Use the app to compare product prices and check if the data is fetched correctly from the backend.
- **Test the Basket**: Ensure that users can add and remove items from their basket and save the basket data.

---

## **Step 6: Build and Release the Android App**

When you're ready to release the app or create a production version, you can build the APK (Android Package) file.

### **6.1. Generate a Signed APK**

1. Create a **keystore file** by running the following command:

   ```bash
   keytool -genkeypair -v -keystore grocery_comparator_app.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias grocerycomparator
   ```

   This will create a `grocery_comparator_app.keystore` file that you will use to sign your app.

2. Open **Android Studio** and navigate to **Build > Generate Signed Bundle / APK**.

3. Select **APK** and click **Next**.

4. Choose the keystore file you generated earlier and fill in the password and alias details.

5. After completing the steps, Android Studio will generate a signed APK, which you can distribute or upload to the Google Play Store.

### **6.2. Publish to Google Play Store**

1. **Create a Developer Account**: You will need a Google Developer account to publish your app on the Play Store. You can sign up [here](https://play.google.com/console/signup).
2. **Upload the APK**: Once the APK is ready, upload it to the **Google Play Console** and follow the instructions for creating a listing (including app description, screenshots, etc.).
3. **Submit for Review**: After filling in the necessary details, submit your app for review. Google will check if it meets all the guidelines.

---

## **Step 7: Troubleshooting & Debugging**

If you encounter issues, follow these steps to debug:

### **7.1. Check the React Native Logs**
Use the following command to monitor logs:

```bash
npx react-native log-android
```

This will provide detailed logs that can help identify the issue.

### **7.2. Debugging API Requests**
If the app is not communicating with the backend:
- Ensure that your backend API is running and accessible.
- Check the URL configurations in the app (as mentioned in Step 2.3).
- Use tools like **Postman** to manually test the API endpoints.

### **7.3. Emulator Issues**
If the Android emulator is not working:
- Try restarting the emulator or Android Studio.
- Ensure that the **HAXM** driver is installed and properly configured for faster emulation.

---
