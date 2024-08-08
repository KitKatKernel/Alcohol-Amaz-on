const {Ingredient} = require('../../models')
const ingredientDrop = document.getElementById("ingredientDrop");

async function newFormHandler(event) {
  event.preventDefault();
  const name = document.querySelector('#beverage_name').value;
  const description = document.querySelector('#description').value;
  const ingredient = document.querySelector('#ingredientDrop').value;
 
  // ? Send fetch request to add a new dish
  const response = await fetch(`/api/beverages`, {
    method: 'POST',
    body: JSON.stringify({
      name,
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
  .querySelector('.addBeverage')
  .addEventListener('submit', newFormHandler);

function getDropDown() {

  fetch(Ingredient, {
        method: "GET",
         }
      )
        .then(function (data) {
          
          for (let i = 0; i < Ingredient.length; i++) {
          const ingredient = Ingredient[i]
  
          const div = document.createElement('option');
         
          div.setAttribute("id", ingredient.id)
          div.textContent = ingredient.name
         
          ingredientDrop.appendChild(div)
          
        }})
      }  

window.addEventListener("load", (event) => {
  getDropDown()
});
