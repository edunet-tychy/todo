const li = null
let newItemForm = null
const shoppingList = [
  'Mleko',
  'Jajko',
  'Masło',
  'Jabłko'
]

// Oczekiwanie na załadowanie elementów DOM
document.addEventListener('DOMContentLoaded', () => {
  // Elementy DOM
  ul = document.querySelector('#shoppingList');
  inputError = document.querySelector('#inputError');
  newItemForm = document.querySelector('#newItemForm');

  // Dodawanie elementów do listy
  for (const shoppingItem of shoppingList) {
    addListItem(shoppingItem)
  }

  // Nasłuchiwanie na przycisku Submit
  newItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target.elements[0];

    if (input.value.length > 2 && !input.value.startsWith(' ')) {
      addListItem(input.value);
      input.value = '';
      input.classList.remove('input-danger')
      inputError.innerText = '';
    } else {
      inputError.innerText = 'Nazwa nie spełnia kryteriów';
      input.classList.add('input-danger');
    }
  })
})

// Funkcja dodajaca elementy do listy
function addListItem (shoppingItem) {
  const li = document.createElement('li');
  li.innerText = shoppingItem;
  ul.appendChild(li);
}
