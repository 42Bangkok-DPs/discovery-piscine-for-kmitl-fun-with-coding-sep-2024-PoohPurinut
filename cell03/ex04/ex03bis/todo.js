const toDoList = $("#ft_list");
const button = $("#createButton");

loadTodos();

button.click(() => {
  const toDo = prompt("Fill a new TO DO:");
  if (toDo) {
    createTodo(toDo);
    saveTodos();
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
    saveTodos();
  }
}

function saveTodos() {
  const todos = [];
  toDoList.children().each((index, element) => {
    todos.push($(element).text());
  });
  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
  const cookies = document.cookie.split("; ");
  const todosCookie = cookies.find((row) => row.startsWith("todos="));
  if (todosCookie) {
    const todos = JSON.parse(decodeURIComponent(todosCookie.split("=")[1]));
    todos.reverse().forEach((todo) => createTodo(todo));
  }
}
