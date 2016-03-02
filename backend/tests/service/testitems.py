import unittest
import service.items

class TestItems(unittest.TestCase):

    def setUp(self):
        self.itemsService = service.items.items()

    def test_get_all_items(self):
        items = self.itemsService.get_items()
        self.assertIsInstance(items, list)

if __name__ == '__main__':
    unittest.main()