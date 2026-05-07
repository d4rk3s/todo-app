import { ERROR_MESSAGES } from "./constants.js";

export function isTaskLangtheValid(nameTask) {
    const length = nameTask.length;

    if (length > 30) {
        console.log(ERROR_MESSAGES.TASK_TOO_LONG);
        return false;
    }

    return true;
}

export function isTaskNameValid(nameTask) {
    if (!nameTask.trim()) {
        console.log(ERROR_MESSAGES.EMPTY_TASK);
        return false;
    }
    return true;
}

export function isTaskExist(nameTask, list) {
    const exists = list.some(task => task.name === nameTask)

    if (exists) {
        console.log(ERROR_MESSAGES.TASK_EXISTS);
        return false;
    }

    return true;
}
