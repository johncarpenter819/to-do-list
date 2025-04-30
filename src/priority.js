export function getPriority() {
    const priority = document.getElementById('priority-selection').value;
    console.log(priority)
    return priority;
}

export function renderPriority(priority) {
    const capitalized = priority ? priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase() : '';
    return priority ? `<p class="task-priority">Priority: ${capitalized}</p>` : '';
}