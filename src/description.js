export function getTaskDetails() {
    const taskInput = document.getElementById('task-input');
    const descInput = document.getElementById('task-desc-input');

    const taskText = taskInput.value.trim();
    const taskDesc = descInput.value.trim();

    if (!taskText) return null;

    return { taskText, taskDesc };
}

export function clearTaskInputs() {
    document.getElementById('task-input').value = '';
    document.getElementById('task-desc-input').value = '';
}
