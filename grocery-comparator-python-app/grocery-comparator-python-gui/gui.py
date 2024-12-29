# grocery-comparator-python-gui/gui.py
import tkinter as tk
from tkinter import messagebox
from api_service import get_products, get_product_details
from basket import Basket

class GroceryApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Grocery Comparator App")

        self.basket = Basket()

        self.create_widgets()

    def create_widgets(self):
        # Display product list
        self.product_listbox = tk.Listbox(self.root, height=10, width=50)
        self.product_listbox.grid(row=0, column=0, padx=10, pady=10)

        self.load_products_button = tk.Button(self.root, text="Load Products", command=self.load_products)
        self.load_products_button.grid(row=1, column=0, padx=10, pady=5)

        # Display basket
        self.basket_listbox = tk.Listbox(self.root, height=10, width=50)
        self.basket_listbox.grid(row=0, column=1, padx=10, pady=10)

        self.clear_basket_button = tk.Button(self.root, text="Clear Basket", command=self.clear_basket)
        self.clear_basket_button.grid(row=1, column=1, padx=10, pady=5)

        # Show selected product details
        self.product_details_label = tk.Label(self.root, text="Product Details will appear here...")
        self.product_details_label.grid(row=2, column=0, columnspan=2, padx=10, pady=5)

    def load_products(self):
        # Fetch products from the backend API
        products = get_products()

        if not products:
            messagebox.showerror("Error", "Failed to fetch products.")
            return

        self.product_listbox.delete(0, tk.END)
        for product in products:
            self.product_listbox.insert(tk.END, f"{product['name']} - £{product['price']}")

        # Bind click event to show product details
        self.product_listbox.bind("<Double-1>", self.show_product_details)

    def show_product_details(self, event):
        # Get selected product from the listbox
        selected_product_index = self.product_listbox.curselection()
        if selected_product_index:
            selected_product_name = self.product_listbox.get(selected_product_index)
            product_name = selected_product_name.split(" - ")[0]

            # Fetch product details from the backend API
            products = get_products()
            product = next((p for p in products if p['name'] == product_name), None)

            if product:
                details = get_product_details(product['id'])
                self.product_details_label.config(text=f"Name: {details['name']}\nPrice: £{details['price']}\nDescription: {details['description']}")
                # Add product to basket button
                self.add_to_basket_button = tk.Button(self.root, text="Add to Basket", command=lambda: self.add_to_basket(product))
                self.add_to_basket_button.grid(row=3, column=0, padx=10, pady=10)

    def add_to_basket(self, product):
        # Add product to basket and update basket listbox
        self.basket.add_item(product)
        self.update_basket_list()

    def update_basket_list(self):
        # Update the basket listbox with current basket items
        self.basket_listbox.delete(0, tk.END)
        for item in self.basket.get_items():
            self.basket_listbox.insert(tk.END, f"{item['name']} - £{item['price']}")

    def clear_basket(self):
        # Clear the basket and update list
        self.basket.clear()
        self.update_basket_list()

