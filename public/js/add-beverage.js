
async function newFormHandler(event) {
  event.preventDefault();
  const name = document.querySelector('#beverage_name').value;
  const description = document.querySelector('#description').value;
  const ingredients = document.querySelector('#ingredientDrop').value;
 
  // ? Send fetch request to add a new drink
  const response = await fetch(`/api/beverages/`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      description, 
      ingredients,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  
  });
  console.log(ingredient);

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add recipe');
  }
}

document
  .querySelector('.addBeverage')
  .addEventListener('submit', newFormHandler);



