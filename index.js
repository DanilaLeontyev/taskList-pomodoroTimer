let enterTask = document.querySelector('.enterTask');
let addBtn = document.querySelector('.addTask');
let taskList = document.querySelector('.taskList');
let clock = document.querySelector('.clock');

function createTask() {
    let task = document.createElement('li');
    let delTask = document.createElement('button');

    task.textContent = enterTask.value;
    delTask.textContent = '-';
    delTask.className = 'delTask';
    task.className = 'taskItem';
    delTask.addEventListener('click', function () {
        task.remove();
    })

    taskList.insertBefore(task, taskList.firstChild);
    task.insertAdjacentElement('beforeend', delTask);

    enterTask.value = '';
}
addBtn.addEventListener('click', createTask);

function timer() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    let nowDate = hours + ':' + minutes + ':' + seconds;

    clock.innerHTML = nowDate;
}
window.setInterval(timer, 1000);
