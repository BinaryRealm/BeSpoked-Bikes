"""
spoonacular_test.py
Written by Xiashiyao Zhang
"""
# pylint: disable=too-few-public-methods
import unittest
from unittest import mock
from spoonacular import search_recipe_by_cuisine_type


def mocked_requests_get(*args, **kwargs):
    """
    Mocked get request
    """

    class MockResponse:
        """
        Mock response class
        """

        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            """
            return json
            """
            return self.json_data

    if args[0] == "https://api.spoonacular.com/recipes/complexSearch":
        return MockResponse({"results": ["value1", "value2"]}, 200)
    return MockResponse(None, 404)


def mocked_requests_get_error(*args, **kwargs):
    """
    mocked_requests_get_error
    """

    class MockResponse:
        """
        Mock response class
        """

        def __init__(self, json_data, status_code):
            self.json_data = json_data
            self.status_code = status_code

        def json(self):
            """
            return json
            """
            return self.json_data

    if args[0] == "https://api.spoonacular.com/recipes/complexSearch":
        return MockResponse({"dummy": ["value1", "value2"]}, 200)
    return MockResponse(None, 404)


class TestSearchRecipeByCuisine(unittest.TestCase):
    """
    Test of SearchRecipeByCuisine
    """

    @mock.patch("requests.get", side_effect=mocked_requests_get)
    def test_response_succeed(self, mock_get):
        """
        Test response
        """
        result_list = search_recipe_by_cuisine_type("american", "breakfast", 2)
        self.assertEqual(result_list, ["value1", "value2"])
        self.assertEqual(mock_get.call_args.kwargs["params"]["cuisine"], "american")
        self.assertEqual(mock_get.call_args.kwargs["params"]["type"], "breakfast")
        self.assertEqual(mock_get.call_args.kwargs["params"]["number"], 2)

    @mock.patch("requests.get", side_effect=mocked_requests_get_error)
    def test_response_api_error(self, mock_get):
        """
        Test for api error
        """
        result_list = search_recipe_by_cuisine_type("american", "breakfast", 2)
        self.assertEqual(result_list, "apierror")


if __name__ == "__main__":
    unittest.main()
