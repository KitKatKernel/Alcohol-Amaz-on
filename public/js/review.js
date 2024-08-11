
async function newFormHandler(event) {
  event.preventDefault();

 
  // ? Send fetch request to add a new drink
  const response = await fetch(`/api/beverages/`, {
    method: 'POST',
    body: JSON.stringify({
      
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  
  });
  console.log(name);

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add recipe');
  }
}

document
  .querySelector('.addReview')
  .addEventListener('submit', newFormHandler);



