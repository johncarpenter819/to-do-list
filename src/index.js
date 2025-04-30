import './index.css';
import { getTaskDetails, clearTaskInputs } from './description.js';
import { getDueDate, renderDueDate } from './dueDate.js';
import { getPriority, renderPriority} from './priority.js';

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');
    const progressBar = document.getElementById('progress');
    const progressNumbers = document.getElementById('numbers');

    const updateProgress = () => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;
        progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
        progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;
    };

    const addTask = () => {
        const details = getTaskDetails();
        if (!details) return;

        const { taskText, taskDesc } = details;
        const dueDate = getDueDate();
        const priority = getPriority();

        const li = document.createElement('li');
        const taskDescriptionText = taskDesc ? `(${taskDesc.trim()})` : '';
        const taskDueDateHTML = renderDueDate(dueDate);
        const taskPriorityHTML = renderPriority(priority);

        li.classList.add('task-item');
        li.innerHTML = `
            <input type="checkbox" class="checkbox"/>
            <div class="task-content">
                <div class="task-header">
                    <span class="task-title">${taskText}</span>
                    <span class="task-desc">${taskDescriptionText}</span>
                </div>
                ${taskDueDateHTML}
                ${taskPriorityHTML}
            </div>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('.task-title').textContent;
                document.getElementById('task-desc-input').value = li.querySelector('.task-desc').textContent;
                document.getElementById('due-date').value = li.querySelector('.task-due-date')?.textContent.replace('Due: ', '') || '';
                document.getElementById('priority-selection').value = li.querySelector('.task-priority')?.textContent.replace(`Priority: `, '') || '';
                li.remove();
                updateProgress();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            updateProgress();
        });

        taskList.appendChild(li);
        clearTaskInputs();
        updateProgress();
    };

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addTask();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });
});
