const toDoList = document.getElementById("ft_list");
const button = document.getElementById("createButton");

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

window.onload = () => {
  const savedToDos = JSON.parse(getCookies("todos")) || [];
  savedToDos.forEach((todo) => createTodo(todo));
};

button.addEventListener("click", () => {
  const toDo = prompt("Fill a new TO DO:");
  if (toDo) {
    createTodo(toDo);
    saveToCookies();
  }
});
function createTodo(message) {
  const newToDo = document.createElement("div");
  newToDo.innerText = message;
  toDoList.prepend(newToDo);
  newToDo.addEventListener("click", () => {
    deleteTodo(newToDo);
  });
}
function deleteTodo(todo) {
  let confirmDelete = confirm("Do you really want to remove this TODO?");
  if (confirmDelete == true) {
    todo.remove();
    removeFromCookies();
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
