document.getElementById('addIngredient').addEventListener('click', function() {
  const ingredientDrop = document.getElementById('ingredientDrop');
  const ingredientParts = document.getElementById('ingredientParts');
  const ingredientList = document.getElementById('ingredientList');

  const selectedIngredient = ingredientDrop.options[ingredientDrop.selectedIndex];
  const ingredientId = selectedIngredient.value;
  const ingredientName = selectedIngredient.text;
  const parts = ingredientParts.value;

  const listItem = document.createElement('li');
  listItem.textContent = `${parts} parts ${ingredientName}`;
  listItem.dataset.id = ingredientId;
  listItem.dataset.parts = parts;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'X';
  removeButton.addEventListener('click', function() {
    ingredientList.removeChild(listItem);
  });

  listItem.appendChild(removeButton);
  ingredientList.appendChild(listItem);

  // Log each added ingredient to the console for debugging
  console.log('Added ingredient:', { ingredientId, ingredientName, parts });
});

document.querySelector('.addBeverage').addEventListener('submit', async function(event) {
  event.preventDefault();

  const beverageName = document.getElementById('beverage_name').value;
  const description = document.getElementById('description').value;
  const ingredientList = document.getElementById('ingredientList').children;

  const ingredients = Array.from(ingredientList).map(item => ({
    id: parseInt(item.dataset.id, 10),
    parts: parseInt(item.dataset.parts, 10),
  }));

  // Debugging log to verify the data being submitted
  console.log('Submitting beverage:', { beverageName, description, ingredients });

  try {
    const response = await fetch('/api/beverages', {
      method: 'POST',
      body: JSON.stringify({ beverageName, description, ingredients }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Recipe created successfully!');
      window.location.reload();
    } else {
      alert('Failed to create recipe.');
      const errorData = await response.json();
      console.error('Server error:', errorData);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    alert('Something went wrong.');
  }
});
