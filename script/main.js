import { STATUS, PRIORITY } from "./modules/constants.js";
import { getNameIndex, getNameTask, getSelector } from "./modules/utils.js";
import { isTaskExist, isTaskLangtheValid, isTaskNameValid } from "./modules/validators.js";

const formHighPriority = getSelector(".high-task-form");
const formLowPriority = getSelector(".low-task-form");
const listHighTasks = getSelector(".high-tasks-list");
const listLowTasks = getSelector(".low-tasks-list");

const storage = localStorage.getItem("todoList");
const list = storage ? JSON.parse(storage) : [];

function addTask(event) {
    event.preventDefault();

    const form = event.target;
    const input = form.elements.task;
    const name = input.value.replace(/\s+/g, " ").trim();

    if (!isTaskExist(name, list)) return;

    if (!isTaskLangtheValid(name)) return;

    if (!isTaskNameValid(name)) return;

    const priority = form === formHighPriority ? PRIORITY.HIGH : PRIORITY.LOW;

    list.push({ name, status: STATUS.TODO, priority });
    localStorage.setItem('todoList', JSON.stringify(list))
    renderTask();
    form.reset();
}

function deleteTask(nameTask) {
    const index = getNameIndex(nameTask, list);

    if (index === -1) return;

    list.splice(index, 1);

    localStorage.setItem('todoList', JSON.stringify(list))
    renderTask();
}

function changeStatus(nameTask) {
    const objTask = getNameTask(nameTask, list);

    if (!objTask) return;

    objTask.status = objTask.status === STATUS.TODO ? STATUS.DONE : STATUS.TODO;

    localStorage.setItem('todoList', JSON.stringify(list))
    renderTask();
}

function createTask(task) {
    const item = document.createElement("div");
    item.classList.add("task");

    if (task.status === STATUS.DONE) {
        item.classList.add("done");
    }

    const left = document.createElement("div");
    left.classList.add("task-left");

    const circle = document.createElement("div");
    circle.classList.add("circle");

    const text = document.createElement("div");
    text.classList.add("task-text");
    text.textContent = task.name;

    const button = document.createElement("button");
    button.classList.add("delete-btn");
    button.type = "button";
    button.textContent = "✕";

    item.append(left, button);
    left.append(circle, text);

    return item;
}

function renderTask() {
    listHighTasks.innerHTML = "";
    listLowTasks.innerHTML = "";

    list.forEach((item) => {
        const taskElement = createTask(item);

        const targetList = item.priority === PRIORITY.HIGH ? listHighTasks : listLowTasks;

        targetList.appendChild(taskElement);
    });
}

function handleTaskClick(event) {
    const target = event.target;
    const task = target.closest(".task");

    if (!task) return;

    const nameTask = task.querySelector(".task-text").textContent;

    if (target.classList.contains("delete-btn")) {
        deleteTask(nameTask);
    }

    if (target.classList.contains("circle")) {
        changeStatus(nameTask);
    }
}

formHighPriority.addEventListener("submit", addTask);
formLowPriority.addEventListener("submit", addTask);

listHighTasks.addEventListener("click", handleTaskClick);
listLowTasks.addEventListener("click", handleTaskClick);

document.addEventListener("DOMContentLoaded", renderTask);
