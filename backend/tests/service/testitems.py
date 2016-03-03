import unittest
import service.items
import db.item

class TestItems(unittest.TestCase):

    def setUp(self):
        self.itemsService = service.items.items()

    def test_get_all_items(self):
        items = self.itemsService.get_items()
        self.assertIsInstance(items, list)

    def test_get_item_by_code(self):
        item = self.itemsService.get_item_by_code("A")
        self.assertIsInstance(item, db.item.item)

    def test_get_items_by_category(self):
        items = self.itemsService.get_items_by_category("1")
        self.assertIsInstance(items, list)

    def test_create_item(self):
        item = self.itemsService.create_item("A", "FIRST ITEM", 1.00, ["1"])
        self.assertIsInstance(item, db.item.item)

if __name__ == '__main__':
    unittest.main()