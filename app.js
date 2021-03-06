// DEfinie UI variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter') ;
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        // Create list item
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fas fa-times"></i>';
        li.appendChild(link);
        // Append the li in the ul
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === "") {
        alert('Add a task');
    }

    // Create list item
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);
    // Append the li in the ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input text
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    // taskList.innerHTML = '';

    // faster method
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear tasks from local storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}