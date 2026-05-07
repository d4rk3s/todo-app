export const getSelector = (selector) => document.querySelector(selector);

export const getNameTask = (nameTask, list) => list.find(task => task.name === nameTask);

export const getNameIndex = (nameTask, list) => list.findIndex(task => task.name === nameTask);