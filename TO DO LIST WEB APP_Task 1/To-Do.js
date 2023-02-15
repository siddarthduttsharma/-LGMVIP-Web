// Selectors
const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");
const clearBtn = document.querySelector("#clear-btn");

// Event listeners
document.addEventListener("DOMContentLoaded", getTasks);
document.querySelector("form").addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", completeTask);
clearBtn.addEventListener("click", clearTasks);

// Functions
function addTask(event) {
  event.preventDefault();

  if (taskInput.value.trim() === "") {
    return;
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();
  const task = document.createElement("li");
  task.innerHTML = `${taskInput.value}<span class="task-time">${date} ${time}</span><button class="delete-btn">Delete</button>`;
  taskList.appendChild(task);

  saveTask(taskInput.value, date, time);

  taskInput.value = "";
}

function deleteTask(event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
    removeTaskFromLocalStorage(event.target.parentElement);
  }
}

function completeTask(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
  }
}

function clearTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

function saveTask(task, date, time) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push({ task: task, date: date, time: time });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.task}<span class="task-time">${task.date} ${task.time}</span><button class="delete-btn">Delete</button>`;
    if (task.completed) {
      li.classList.add("completed");
    }
    taskList.appendChild(li);
  });
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  const taskIndex = taskItem.textContent.slice(0, -26);
  tasks = tasks.filter((task) => task.task !== taskIndex);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
