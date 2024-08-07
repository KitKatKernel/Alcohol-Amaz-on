async function newFormHandler(event) {
  event.preventDefault();
  const beverage_name = document.querySelector('#beverage_name').value;
  const description = document.querySelector('#description').value;
  const ingredient = document.querySelector('#ingredient_id').value;
  const Ingredient = require('../../models')
  // ? Send fetch request to add a new dish
  const response = await fetch(`/api/beverage`, {
    method: 'POST',
    body: JSON.stringify({
      beverage_name,
      description,
      ingredient
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add recipe');
  }
}

document
  .querySelector('.new-beverage-form')
  .addEventListener('submit', newFormHandler);

  function getDropDown() {

    fetch(Ingredient.Ingredient, {
          method: "GET",
          }
      )
      .then(function (response) {
        return response.json();
      })
  
      .then((data) => {
          console.log(data);
          agencyList.push(data.CodeList[0].ValidValue)
          console.log(agencyList)
          return(agencyList)
        })
  
        .then(function (data) {
          
          for (let i = 0; i < agencyList[0].length; i++) {
          const agency = agencyList[0][i]
  
          const div = document.createElement('option');
         
          div.setAttribute("id", agency.ParentCode)
          div.textContent = agency.Value
         
          agencyDrop.appendChild(div)
          
        }})
      }  