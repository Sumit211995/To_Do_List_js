'use strict';
let newTask = document.querySelector('#new-task');
let addTaskBtn = document.querySelector('#addTask');

let toDoUl = document.querySelector('.todo-list ul');
let editTaskBtn = document.querySelector('.edit-btn');
let labelText = document.querySelector('#todotask');

let filterOptions = document.querySelector('.filter-todos');
filterOptions.addEventListener('change', filterTodos);

let taskList = [];
let editIndex = 0;

window.onload = loadTask;
//load Task
function loadTask() {
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(tasks);
    displayTaskList();
  }
}

//Add task
addTaskBtn.addEventListener('click', function (e) {
  e.preventDefault;
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(tasks);
  }
  if (newTask.value === '') {
    alert('Task cannot be blank');
  } else {
    var taskValue = newTask.value;
    taskList.push(taskValue);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    newTask.value = '';
    displayTaskList();
  }
});

//edit Task click event
editTaskBtn.addEventListener('click', function () {
  taskList[editIndex] = newTask.value;
  editTaskBtn.style.display = 'none';
  addTaskBtn.style.display = 'block';
  localStorage.setItem('tasks', JSON.stringify(taskList));
  labelText.innerHTML = 'Add New Task here:';
  labelText.style.fontWeight = 'bold';
  displayTaskList();
  newTask.value = '';
});

//display Task
function displayTaskList() {
  let tasks = localStorage.getItem('tasks');
  if (tasks === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(tasks);
  }
  let htmlCode = '';
  taskList.map((list, idx) => {
    htmlCode += `<li><input type="checkbox" id=${idx} onclick=updateStatus(this)><label>${list}</lable><button class="update" onclick=editTask(${idx})><i
    class='fa fa-pen-to-square'></i></button>
    <button class="delete" onclick=deleteItem(${idx})><i class="fa fa-trash"></i></button></li>`;
  });
  toDoUl.innerHTML = htmlCode;
}

//edit task
function editTask(idx) {
  editIndex = idx;
  newTask.value = taskList[idx];
  editTaskBtn.style.display = 'block';
  addTaskBtn.style.display = 'none';
  labelText.innerHTML = 'Update Task:';
  labelText.style.fontWeight = 'bold';
}

//delete task
function deleteItem(idx) {
  taskList = JSON.parse(localStorage.getItem('tasks'));
  taskList.splice(idx, 1);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  displayTaskList();
}

//Update Status
function updateStatus(selectedTask) {
  console.log(selectedTask);
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add('checked');
    //updating the status of selected task to complete
    toDoUl.children[selectedTask.id].classList.value = 'completed';
  } else {
    taskName.classList.remove('checked');
    //updating the status of selected task to pending
    toDoUl.children[selectedTask.id].classList.value = 'pending';
  }

  localStorage.setItem('tasks', JSON.stringify(taskList));
}

//filter task
function filterTodos(e) {
  const todos = toDoUl.childNodes;

  todos.forEach(function (list) {
    if (list.nodeName === 'LI') {
      switch (e.target.value) {
        case 'All':
          list.style.display = 'list-item';
          break;
        case 'Complete':
          if (list.classList.contains('completed')) {
            list.style.display = 'list-item';
          } else {
            list.style.display = 'none';
          }
          break;
        case 'Incomplete':
          if (list.classList.contains('completed')) {
            list.style.display = 'none';
          } else {
            list.style.display = 'list-item';
          }
          break;
      }
    }
  });
}
