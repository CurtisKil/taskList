// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.getElementById("task");

// Load all event listeners
loadEventListeners();
// DOM Load Event
document.addEventListener("DOMContentLoaded", getTasks);
// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
  //   Remove Task Event
  taskList.addEventListener("click", removeTask);
  //   Clear All Tasks Event
  clearBtn.addEventListener("click", clearTasks);
  //   Filter Tasks Event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  /*    Loop through tasks that are there
    and display those tasks same way you created them
*/
  tasks.forEach(function (task) {
    //   Create li element
    const li = document.createElement("li");
    // Add class (Materialize Class)
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    //   Create new link element
    const link = document.createElement("a");
    // Add Class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';
    //   Append link to li
    li.appendChild(link);

    //   Append li to Ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Foo. You need to add a task!");
  }

  //   Create li element
  const li = document.createElement("li");
  // Add class (Materialize Class)
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //   Create new link element
  const link = document.createElement("a");
  // Add Class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //   Append link to li
  li.appendChild(link);

  //   Append li to Ul
  taskList.appendChild(li);

  //   Store Task In Local Storage
  storeTask(taskInput.value);

  //   Clear Input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task to Local Storage
function storeTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task From DOM
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //   Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  //   taskList.innerHTML = "";
  //  And this ^^ isn't compatible with IE

  // Faster with while loop/removeChild
  // While there still is a first child
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //   Clear from LS
  clearTasksFromLocalStorage();
}

// Clear All Tasks From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
