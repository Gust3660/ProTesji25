document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addTaskButton").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskList = document.getElementById("taskList");
  const taskSectionTitle = document.getElementById("taskSectionTitle");

  if (taskInput.value.trim() !== "" && taskDate.value) {
    const task = {
      text: taskInput.value,
      date: taskDate.value,
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = "";
    taskDate.value = "";

    // Mostrar el título cuando haya tareas
    taskSectionTitle.style.display = "block";
  } else {
    alert("Por favor, completa todos los campos.");
  }
});

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task));

  const taskSectionTitle = document.getElementById("taskSectionTitle");
  const taskList = document.getElementById("taskList");

  // Mostrar el título si hay tareas
  taskSectionTitle.style.display = taskList.children.length > 0 ? "block" : "none";
}

function renderTask(task) {
  const taskList = document.getElementById("taskList");
  const listItem = document.createElement("li");
  listItem.className = "task-item";

  const today = new Date();
  const taskDate = new Date(task.date);
  const diff = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));

  // Asignar color según la proximidad de la fecha
  if (diff < 3) {
    listItem.classList.add("red");
  } else if (diff < 7) {
    listItem.classList.add("orange");
  } else {
    listItem.classList.add("green");
  }

  const taskText = document.createElement("span");
  taskText.textContent = `${task.text} - Fecha límite: ${task.date}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.addEventListener("click", function () {
    deleteTask(task);
    taskList.removeChild(listItem);

    const taskSectionTitle = document.getElementById("taskSectionTitle");
    if (taskList.children.length === 0) {
      taskSectionTitle.style.display = "none";
    }
  });

  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);
}

function deleteTask(taskToDelete) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.text !== taskToDelete.text || task.date !== taskToDelete.date);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
