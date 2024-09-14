const toDoList = $("#ft_list");
const button = $("#createButton");

function getCookies(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

$(document).ready(() => {
  const savedToDos = JSON.parse(getCookies("todos")) || [];
  savedToDos.forEach((todo) => createTodo(todo));
});

button.click(() => {
  const toDo = prompt("Fill a new TO DO:");
  if (toDo) {
    createTodo(toDo);
    saveToCookies(toDo);
  }
});

function createTodo(message) {
  const newToDo = $("<div></div>").text(message);
  toDoList.prepend(newToDo);
  newToDo.click(() => {
    deleteTodo(newToDo);
  });
}

function deleteTodo(todo) {
  const confirmDelete = confirm("Do you really want to remove this TODO?");
  if (confirmDelete) {
    todo.remove();
    removeFromCookies(todo.text());
  }
}

function saveToCookies(toDo) {
  const savedToDos = JSON.parse(getCookies("todos")) || [];
  savedToDos.push(toDo);
  setCookie("todos", JSON.stringify(savedToDos), 7);
}

function removeFromCookies(toDo) {
  let savedToDos = JSON.parse(getCookies("todos")) || [];
  savedToDos = savedToDos.filter((item) => item !== toDo);
  setCookie("todos", JSON.stringify(savedToDos), 7);
}
