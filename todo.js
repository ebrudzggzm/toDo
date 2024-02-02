const form = document.querySelector("#section");
const todoinput = document.querySelector("#newTask");
const btnSave = document.querySelector("#addBtn");
const table = document.querySelector(".table-list");
const tbody = document.querySelector("#tbody");
const alertSuccess = document.querySelector("#foot");
const rowNumber = document.querySelector("#number");
const deleteAll = document.querySelector("#deleteAll");
const searchInput = document.querySelector("#seacrhTask");
let rowCount = 0;
let todos = [];

eventListeners();

function eventListeners() {
  btnSave.addEventListener("click", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  deleteAll.addEventListener("click", deleteAllTodos);
  searchInput.addEventListener("keyup", filter);
}

//yeni to do ekleme
function addTodo() {
  const newTodo = todoinput.value.trim();
  console.log(newTodo)
  if (newTodo == null || newTodo == "") {
    showAlert("warning", "Please add a to do.");
  } else {
    //arayüze ekleme
    addTodoToUI(newTodo);
    //storage a ekleme
    addTodoToStorage(newTodo);
    //uyarı gösterme
    showAlert("success", "to do is added.");
  }

  //e.preventDefault();  eventi submit  ise farklı bir sayfaya yönlendrimesini engellemek için kullanırız.
}
//addTodo()  metodu ile hem storage a hem aryüze eklenmelidir,o nedenle,iki function tanımlayacağım.
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

//filtreleme,search
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoList = document.querySelectorAll("#listTr");
  if (todoList.length > 0) {
    todoList.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : ");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "There must be a to do for search!");
  }
}

//yeni satır oluşturma  ---arayüze ekleme
function addTodoToUI(newTodo) {
  rowCount++;
  const listItem = document.createElement("tr");
  listItem.id = "listTr";
  listItem.className = "rows";

  const firstTd = document.createElement("td");
  firstTd.id = "number";

  firstTd.textContent = rowCount;

  const secondTd = document.createElement("td");
  secondTd.innerHTML = `${newTodo}`;

  // select box
  const selectBox = document.createElement("select");
  selectBox.name = "status";
  selectBox.id = "selectBox";

  const options = ["New", "In Progress", "Done"];

  for (const option of options) {
    const optionElement = document.createElement("option");
    optionElement.text = option;
    selectBox.appendChild(optionElement);
  }
  const thirdTd = document.createElement("td");
  thirdTd.innerHTML;

  thirdTd.appendChild(selectBox);

  //satır ile birlikte oluşacak butonlar

  // const editBtn = document.createElement("button");
  // editBtn.id = "editBtn";
  // editBtn.className = "btn btn-success";
  // editBtn.textContent = "Edit";
  // editBtn.addEventListener("click", editTodo);

  const deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteBtn";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", deleteTodo);

  const fourthTd = document.createElement("td");
  thirdTd.innerHTML;

  //fourthTd.appendChild(editBtn);
  fourthTd.appendChild(deleteBtn);

  //tr satırına td ler eklendi
  listItem.appendChild(firstTd);
  listItem.appendChild(secondTd);
  listItem.appendChild(thirdTd);
  listItem.appendChild(fourthTd);
  //tr tbody e eklendi
  tbody.appendChild(listItem);

  todoinput.value = ""; // eklendikten sonra input boş kalsın
}
//tüm to do ları temizleme
function deleteAllTodos(e) {
  if (e.target.id === "deleteAll") {
    const todoListesi = document.querySelectorAll(".rows");
    if (todoListesi.length > 0) {
      // ekrandan silme
      todoListesi.forEach(function (todo) {
        todo.remove();
      });
      //storagedan silme
      todos = [];
      localStorage.setItem("todos", JSON.stringify(todos));
      rowCount = 0;
      showAlert("success", "All to dos are deleted.");
    } else {
      showAlert("warning", "There must be a to do for delete!");
    }

    console.log(todoListesi);
  }
}

//---storage a ekleme
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//localstorage da veri var mı, varsa onlarıda getirsin.
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

//todo rowu silme.
function deleteTodo(e) {
  if (e.target.id === "deleteBtn") {
    //ekrandan silme
    let removedElement = e.target.parentElement.parentElement;
    removedElement.remove();
    //storagedan silme
    removedTodoToStorage(removedElement);
    console.log(removedElement);
    showAlert("success", "To do is deleted successfuly.");
  }
}

function removedTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  console.log(todos);
  const removedTodoText = removeTodo.children[1].textContent;
  todos.forEach(function (todo, index) {
    if (removedTodoText === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  div.style.width = "30%";
  div.style.position = "absolute";
  div.style.right = "5px";
  div.style.top = "5px";
  form.appendChild(div);
  setTimeout(() => div.remove(), 2500);
}

{
  /* <tbody class="tbody fs-5 gap-3">
                    <tr class="gap-2">
                        <td>1</td>
                        <td>Buy Something</td>
                        <td>
                            <select name="" id="selectBox">
                                <option value="0">New</option>
                                <option value="0">In Progress</option>
                                <option value="0">Done</option>
                            </select>
                        </td>
                        <td>
                            <button id="editBtn" class="btn btn-success">Edit</button>
                            <button id="deleteBtn" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>               
                </tbody> */
}
