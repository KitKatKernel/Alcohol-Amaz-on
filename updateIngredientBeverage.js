/**
 * Elijah and Nick,
 * 
 * This function takes in the ingredient and beverage data 
 * updates ingredient IDs and also adds the new ingredients from the beverage data 
 * to the ingredient data
 * 
 * Usage:
 * 1. Take your initial `ingredientData` and `beverageData` arrays from the .jsons 
 * and replace the example data below
 * 2. Call `updateIngredients(ingredientData, beverageData)` with these arrays
 * 3. The function will return an object containing the updated ingredient and beverage data.
 * 
 * Ex
 * const result = updateIngredients(ingredientData, beverageData);
 * console.log(result.updatedIngredientData);
 * console.log(result.updatedBeverageData);
 * 
 * Run it in your terminal after updating and saving:
 * $ node updateIngredients.js
 */


function updateIngredients(ingredientData, beverageData) {
    // Create map tofind ingredient IDs by name in lowercase.
    const ingredientMap = new Map();
    ingredientData.forEach((ingredient, index) => {
        ingredientMap.set(ingredient.name.toLowerCase(), index + 1);
    });

    // Keep track next available ID for new ingredients.
    let nextId = ingredientData.length + 1;

    // Process each beverage to update ingredient IDs and add new ingredients if needed.
    beverageData.forEach(beverage => {
        // Check if the beverage has an ingredients list and no ingredient IDs.
        if (beverage.ingredients && !beverage.ingredient_ids) {
            beverage.ingredient_ids = [];
            beverage.ingredients.forEach(ingredient => {
                const ingredientName = ingredient.toLowerCase();
                // Use the existing ID if the ingredient is already known.
                if (ingredientMap.has(ingredientName)) {
                    beverage.ingredient_ids.push(ingredientMap.get(ingredientName));
                } else {
                    // If it's a new ingredient, add it to the list and map.
                    ingredientData.push({ name: ingredient });
                    ingredientMap.set(ingredientName, nextId);
                    beverage.ingredient_ids.push(nextId);
                    nextId++;
                }
            });
            // Remove original ingredients array from the beverage.
            delete beverage.ingredients;
        }
    });

    // Returns updated ingredient and beverage data.
    return { updatedIngredientData: ingredientData, updatedBeverageData: beverageData };
}

// This is an example, so you should replace it with ingredientData.
const ingredientData = [
  { "name": "Rum" },
  { "name": "Coconut Cream" },
  { "name": "Pineapple Juice" },
  { "name": "Respado Tequila" },
  { "name": "Lime Juice" },
  { "name": "Mint" },
  { "name": "Soda Water" },
  { "name": "Vodka" },
  { "name": "Gin" },
  { "name": "Lemon Juice" },
  { "name": "Aromatic Bitters" },
  { "name": "Cognac" },
  { "name": "Dry Vermouth" },
  { "name": "Sweet Vermouth" },
  { "name": "Orange Bitters" },
  { "name": "Orange Juice" },
  { "name": "Triple Sec" },
  { "name": "Bourbon" },
  { "name": "Egg White" },
  { "name": "Grenadine" }
];
// Same for beverageData, replace these, they're just here as an example.
const beverageData = [
  {
    "name": "Martini",
    "description": "A classic cocktail made with gin and dry vermouth, garnished with an olive or lemon twist.",
    "ingredients": ["Gin", "Dry Vermouth", "Olive"]
  },
  {
    "name": "Old Fashioned",
    "description": "A simple blend of bourbon, sugar, bitters, and a twist of citrus rind.",
    "ingredients": ["Bourbon", "Angostura Bitters", "Sugar", "Water"]
  }
];

const result = updateIngredients(ingredientData, beverageData);

console.log("Updated Ingredient Data:", JSON.stringify(result.updatedIngredientData, null, 2));
console.log("Updated Beverage Data:", JSON.stringify(result.updatedBeverageData, null, 2));
