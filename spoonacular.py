"""
Handle Spoonacular API Requests
"""
import os
import json
from random import randrange
import requests
from dotenv import load_dotenv, find_dotenv


def pretty_print(data):
    """
    helper function to print json data in readable format
    """
    print(json.dumps(data, indent=4, sort_keys=True))


load_dotenv(find_dotenv())


spoonacular_key = os.getenv("SPOONACULAR_KEY")


def search_recipe(query, number):
    """
    search for recipes by query and how many results to get
    """
    base_url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {"apiKey": spoonacular_key, "query": query, "number": number}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        results = data["results"]
    except (KeyError, requests.exceptions.JSONDecodeError):
        return "apierror"
    return results


def search_recipe_by_cuisine_type(cuisine, dish_type, number):
    """
    search for recipes by cuisine dish_type and how many results to get
    """
    base_url = "https://api.spoonacular.com/recipes/complexSearch"
    params = {
        "apiKey": spoonacular_key,
        "cuisine": cuisine,
        "type": dish_type,
        "number": number,
        "offset": randrange(10),
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        results = data["results"]
    except (KeyError, requests.exceptions.JSONDecodeError):
        return "apierror"
    return results


# pylint: disable=too-many-locals
def get_recipe_info(recipe_id, include_nutrition=False):
    """
    get recipe info by id, optionally get nutrition data
    """
    base_url = f"https://api.spoonacular.com/recipes/{recipe_id}/information"
    params = {"apiKey": spoonacular_key, "includeNutrition": include_nutrition}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()

        title = data["title"]
        image = data["image"]
        source_url = data["sourceUrl"]
        ready_in_minutes = data["readyInMinutes"]
        servings = data["servings"]
        price_per_serving = data["pricePerServing"]

        cuisines = data["cuisines"]
        dish_types = data["dishTypes"]

        instructions = data["instructions"]
        analyzed_instructions = data["analyzedInstructions"]
        ingredients = data["extendedIngredients"]

        diets = data["diets"]
        dairy_free = data["dairyFree"]
        gluten_free = data["glutenFree"]
        vegan = data["vegan"]
        vegetarian = data["vegetarian"]

        if include_nutrition is True:
            nutrition_info = data["nutrition"]
        else:
            nutrition_info = None

    except (KeyError, requests.exceptions.JSONDecodeError):
        return "apierror"
    return (
        title,
        image,
        source_url,
        ready_in_minutes,
        servings,
        price_per_serving,
        cuisines,
        dish_types,
        instructions,
        analyzed_instructions,
        ingredients,
        diets,
        dairy_free,
        gluten_free,
        vegan,
        vegetarian,
        nutrition_info,
    )


def search_ingredients(query, number):
    """
    search for recipes, number of results to get
    """
    base_url = "https://api.spoonacular.com/food/ingredients/search"
    params = {"apiKey": spoonacular_key, "query": query, "number": number}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        results = data["results"]
    except (KeyError, requests.exceptions.JSONDecodeError):
        return "apierror"
    return results


def get_ingredient_info(ingredient_id, amount=1, unit=None):
    """
    get recipe info, set amount and optionally units (e.g. "g" for grams)
    """
    base_url = (
        f"https://api.spoonacular.com/food/ingredients/{ingredient_id}/information"
    )
    if unit is None:
        params = {"apiKey": spoonacular_key, "amount": amount}
    else:
        params = {"apiKey": spoonacular_key, "amount": amount, "unit": unit}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        name = data["name"]
        image = data["image"]
        aisle = data["aisle"]
        estimated_cost = data["estimatedCost"]
        caloric_breakdown = data["nutrition"]["caloricBreakdown"]
        nutrients = data["nutrition"]["nutrients"]
        weight_per_serving = data["nutrition"]["weightPerServing"]
    except (KeyError, requests.exceptions.JSONDecodeError):
        return "apierror"
    return (
        name,
        image,
        aisle,
        estimated_cost,
        caloric_breakdown,
        nutrients,
        weight_per_serving,
    )


# Demo of getting API data
# pretty_print(search_recipe("pizza", 5))
# pretty_print(search_ingredients("apple", 3))
# for d in get_recipe_info(656329, include_nutrition=False):
#     print(d)
# for d in get_ingredient_info(9003):
#     print(d)
