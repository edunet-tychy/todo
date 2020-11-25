'use strict'

const li = null;
let ul = null;
let todoForm = null;
const todoNameError = null;
const todoDescError = null;
let todoList = null;

// Oczekiwanie na załadowanie elementów DOM
document.addEventListener('DOMContentLoaded', () => {
  // Elementy DOM
  ul = document.getElementById('todoList');
  todoForm = document.getElementById('todoForm');
  const todoNameError = document.querySelector('#todoNameError');
  const todoDescError = document.querySelector('#todoDescError');

  // Wywołanie danych z localStorage
  getToDoList()

  // Nasłuchiwanie na przycisku Submit
  todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoName = event.target.elements[0];
    const todoDesc = event.target.elements[1];

    if (todoName.value.length > 2 && todoDesc.value.length > 10) {
      const newTodo = {
        name: todoName.value,
        desc: todoDesc.value,
        done: false
      }

      for (const todo of todoList) {
        if (todo.name === todoName.value && todo.desc === todoDesc.value) {
          return
        }
      }

      todoList.push(newTodo)

      // Zapisywanie danych na localStorage
      localStorage.setItem('todoList', JSON.stringify(todoList))

      // Czyszczenie danych z formularza
      todoName.value = '';
      todoDesc.value = '';
      // Wywołanie funkcji tworzącej listę zadań
      renderList()
    } else {
      // Ostrzeżenia
      if (todoName.value.length < 3) {
        todoName.classList.add('input-danger');
        todoNameError.innerText = 'Nazwa jest zbyt krótka! (min 3 znaki)';
      }
      if (todoDesc.value.length < 10) {
        todoDesc.classList.add('input-danger');
        todoDescError.innerText = 'Opis jest zbyt krótka! (min 10 znaków)';
      }
    }

    // Czyszczenie pól z ostrzeżeniem
    if (todoName.value.length > 2) {
      todoName.classList.remove('input-danger');
      todoNameError.innerText = '';
    }
    if (todoDesc.value.length > 10) {
      todoDesc.classList.remove('input-danger');
      todoDescError.innerText = '';
    }
  })
})

// Tworzenie listy zadań
const renderList = () => {
  const liList = Array.from(ul.getElementsByTagName('li'));
  // Usuwanie EventListener
  liList.forEach((li) => {
    const button = li.getElementsByTagName('button')[0];
    button.removeEventListener('click', changeTaskStatus);
  })

  ul.innerHTML = ''

  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const main = document.createElement('main');
    const heading = document.createElement('h5');
    const paragraph = document.createElement('p');
    const button = document.createElement('button');

    button.addEventListener('click', changeTaskStatus);
    button.dataset.taskId = index;

    if (!todo.done) {
      button.innerText = 'finish';
      button.classList.add('btn', 'btn-success', 'btn-sm');
    } else {
      button.innerText = 'revert';
      button.classList.add('btn', 'btn-danger', 'btn-sm');
      main.style.textDecoration = 'line-through';
    }

    heading.innerText = todo.name;
    paragraph.innerText = todo.desc;

    main.appendChild(heading);
    main.appendChild(paragraph);

    li.appendChild(main);
    li.appendChild(button);

    ul.appendChild(li);

    ul.appendChild(li);

    // Zapisywanie danych na localStorage
    localStorage.setItem('todoList', JSON.stringify(todoList));
  })
}

// Status zadania
const changeTaskStatus = (event) => {
  const todo = todoList[Math.round(event.target.dataset.taskId)];

  if (todo.done === true) {
    todo.done = false;
  } else {
    todo.done = true;
  }

  renderList();
}

// JSON - zapis do localStorage
const getToDoList = () => {
  if (localStorage.getItem('todoList')) {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    renderList();
  } else {
    todoList = [];
  }
}
