const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('task-input');
const taskBody = document.getElementById('task-body');
let taskCounter = 1;
let currentEditRow = '';

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${taskCounter++}</td>
        <td class="task-text">${taskText}</td>
        <td>
            <button class="edit" onclick="startEdit(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </td>
    `;
    
    taskBody.appendChild(row);
    taskInput.value = '';
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
    updateSerialNumbers();
    alert('Are You Sure To Delete',button)
}


function startEdit(button) {
    if (currentEditRow) {
        alert('Please save or cancel the current edit first.');
        return;
    }

    currentEditRow = button.parentElement.parentElement;
    const taskCell = currentEditRow.querySelector('.task-text');
    taskInput.value = taskCell.textContent;
    addTaskButton.textContent = 'Save Task';
    addTaskButton.removeEventListener('click', addTask);
    addTaskButton.addEventListener('click', saveEdit);
}

function saveEdit() {
    const newTaskText = taskInput.value.trim();
    if (newTaskText === '') return;

    const taskCell = currentEditRow.querySelector('.task-text');
    taskCell.textContent = newTaskText;
    taskInput.value = '';
    addTaskButton.textContent = 'Add Task';
    addTaskButton.removeEventListener('click', saveEdit);
    addTaskButton.addEventListener('click', addTask);
    currentEditRow = null;
    updateSerialNumbers();
    alert('succes full update',newTaskText)
}


function updateSerialNumbers() {
    const rows = taskBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

