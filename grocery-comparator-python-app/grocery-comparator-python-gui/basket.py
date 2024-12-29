# grocery-comparator-python-gui/basket.py

class Basket:
    def __init__(self):
        self.items = []

    def add_item(self, product):
        self.items.append(product)

    def remove_item(self, product_id):
        self.items = [item for item in self.items if item['id'] != product_id]

    def get_items(self):
        return self.items

    def clear(self):
        self.items = []
