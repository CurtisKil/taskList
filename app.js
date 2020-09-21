// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.getElementById("task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener("submit", addTask);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Bitch you need to add a task");
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
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //   Append link to li
  li.appendChild(link);

  //   Append li to Ul
  taskList.appendChild(li);

  //   Clear Input
  taskInput.value = "";

  e.preventDefault();
}
