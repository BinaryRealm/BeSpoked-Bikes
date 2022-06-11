"""
Server-side tests
"""

import unittest
from unittest.mock import MagicMock, patch
from spoonacular import search_recipe


class SpoonacularTests(unittest.TestCase):
    """
    Tests for the spoonacular API
    """

    def test_search_recipe(self):
        """
        Test the output of the search_recipe wrapper
        """

        mock_response = MagicMock()
        mock_response.json.return_value = {
            "results": [
                {
                    "id": 656329,
                    "title": "Pizza bites with pumpkin",
                    "image": "https://spoonacular.com/recipeImages/656329-312x231.jpg",
                    "imageType": "jpg",
                },
                {
                    "id": 680975,
                    "title": "BLT Pizza",
                    "image": "https://spoonacular.com/recipeImages/680975-312x231.jpg",
                    "imageType": "jpg",
                },
            ],
            "offset": 0,
            "number": 2,
            "totalResults": 37,
        }
        with patch("spoonacular.requests.get") as mock_get:

            expected_output = [
                {
                    "id": 656329,
                    "title": "Pizza bites with pumpkin",
                    "image": "https://spoonacular.com/recipeImages/656329-312x231.jpg",
                    "imageType": "jpg",
                },
                {
                    "id": 680975,
                    "title": "BLT Pizza",
                    "image": "https://spoonacular.com/recipeImages/680975-312x231.jpg",
                    "imageType": "jpg",
                },
            ]

            mock_get.return_value = mock_response

            result = search_recipe("pizza", 2)

            self.assertEqual(result, expected_output)

    def test_search_ingredients(self):
        """
        Test the output of the search_ingredients wrapper
        """

        mock_response = MagicMock()
        mock_response.json.return_value = {
            "results": [
                {"id": 9003, "name": "apple", "image": "apple.jpg"},
                {"id": 9019, "name": "applesauce", "image": "applesauce.png"},
                {"id": 9016, "name": "apple juice", "image": "apple-juice.jpg"},
            ],
            "offset": 0,
            "number": 3,
            "totalResults": 39,
        }
        with patch("spoonacular.requests.get") as mock_get:

            expected_output = [
                {"id": 9003, "image": "apple.jpg", "name": "apple"},
                {"id": 9019, "image": "applesauce.png", "name": "applesauce"},
                {"id": 9016, "image": "apple-juice.jpg", "name": "apple juice"},
            ]

            mock_get.return_value = mock_response

            result = search_recipe("pizza", 2)

            self.assertEqual(result, expected_output)


if __name__ == "__main__":
    unittest.main()
