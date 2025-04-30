export function getDueDate() {
    const dueDate = document.getElementById('due-date').value;
    console.log(dueDate);
    return dueDate;
}

export function renderDueDate(dueDate) {
    return dueDate ? `<p class="task-due-date">Deadline: ${dueDate}</p>` : '';
}