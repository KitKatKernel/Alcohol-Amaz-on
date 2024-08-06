async function newFormHandler(event) {
  event.preventDefault();
  const beverage_name = document.querySelector('#beverage_name').value;
  const description = document.querySelector('#description').value;
  const ingredient = document.querySelector('#ingredient').value;
  // ? Send fetch request to add a new dish
  const response = await fetch(`/api/beverage`, {
    method: 'POST',
    body: JSON.stringify({
      beverage_name,
      description,
      ingredients
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //if the dish is added, the 'all' template will be rerendered
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add recipe');
  }
}

document
  .querySelector('.new-beverage-form')
  .addEventListener('submit', newFormHandler);
