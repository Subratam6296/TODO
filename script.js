const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResultList = document.getElementById('searchResultList');

// Array to store tasks
let tasks = [];

// Event listener for form submission
taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;

    // Create task object
    const task = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        status: status,
    };

    // Add task to array
    tasks.push(task);

    // Update task display
    displayTasks();

    // Clear form fields
    taskForm.reset();
});

// Event listener for search button
searchButton.addEventListener('click', function () {
    displaySearchResults();
});

// Function to display search results
function displaySearchResults() {
    // Clear search result list
    searchResultList.innerHTML = '';

    // Filter tasks based on search input
    const searchQuery = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery)
    );

    // Display filtered tasks in the search result list
    filteredTasks.forEach(task => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = `<p>${task.name}</p>`;
        searchResultList.appendChild(resultItem);
    });
}

// Function to display tasks
function displayTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Filter tasks based on search input
    const searchQuery = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery)
    );

    // Display filtered tasks
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-item-details');
        taskDetails.innerHTML = `
            <h3>${task.name}</h3>
            <div class="labels">
                <span>Priority: ${task.priority}</span>
                <span>Status: ${task.status}</span>
            </div>
            <p>Due Date: ${task.dueDate}</p>
        `;

        const taskFunctions = document.createElement('div');
        taskFunctions.classList.add('functions');
        taskFunctions.innerHTML = `
            <span class="delete" onclick="deleteTask(${index})">&#x2715; Delete</span>
            <span class="undo" onclick="undoTask(${index})">&#8617; Undo</span>
        `;

        taskItem.appendChild(taskDetails);
        taskItem.appendChild(taskFunctions);
        taskList.appendChild(taskItem);
    });

    // Update task count
    updateTaskCount();
}

// Function to update task count
function updateTaskCount() {
    const todoCount = tasks.filter(task => task.status === 'todo').length;
    const inProgressCount = tasks.filter(task => task.status === 'inProgress').length;
    const doneCount = tasks.filter(task => task.status === 'done').length;

    taskCount.innerHTML = `
        <p>Total Tasks: ${tasks.length}</p>
        <p>To-Do: ${todoCount}</p>
        <p>In Progress: ${inProgressCount}</p>
        <p>Done: ${doneCount}</p>
    `;
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Function to undo a deleted task
function undoTask(index) {
    if (index >= 0 && index <= tasks.length) {
        tasks.splice(index, 0, tasks[index]);
        displayTasks();
    }
}

// Initial display
displayTasks();
