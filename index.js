const enterTask = document.querySelector('.enterTask');
const addBtn = document.querySelector('.addTask');
const taskList = document.querySelector('.taskList');

function createTask() {
    let task = document.createElement('li');
    let delTask = document.createElement('button');

    task.textContent = enterTask.value;
    delTask.className = 'delTask';
    task.className = 'taskItem';
    delTask.addEventListener('click', function () {
        task.remove();
    });

    taskList.insertBefore(task, taskList.firstChild);
    task.insertAdjacentElement('beforeend', delTask);

    enterTask.value = '';
}
addBtn.addEventListener('click', createTask);