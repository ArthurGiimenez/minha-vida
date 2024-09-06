function initializeCalendar() {
    const calendar = document.getElementById('calendar').getElementsByTagName('tbody')[0];
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const saveTaskBtn = document.getElementById('save-task');
    const taskDateInput = document.getElementById('task-date');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskPopup = document.getElementById('task-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const taskList = document.getElementById('task-list');

    let currentDate = new Date();
    let tasks = {};

    function renderCalendar() {
        calendar.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                let dayClass = '';

                if (i === 0 && j < firstDayOfMonth) {
                    cell.innerHTML = '';
                } else if (date > daysInMonth) {
                    break;
                } else {
                    if (tasks[date]) {
                        dayClass = 'task-day';
                    }

                    cell.innerHTML = `<button class="add-task ${dayClass}" data-date="${date}">${date}</button>`;
                    date++;
                }

                row.appendChild(cell);
            }

            calendar.appendChild(row);

            if (date > daysInMonth) {
                break;
            }
        }

        attachTaskListeners();
    }

    function attachTaskListeners() {
        const taskButtons = document.querySelectorAll('.add-task');
        taskButtons.forEach(button => {
            button.addEventListener('click', () => {
                const day = button.getAttribute('data-date');
                if (tasks[day]) {
                    showPopup(day);
                } else {
                    taskDateInput.value = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    taskDescriptionInput.disabled = false;
                    taskDescriptionInput.focus();
                }
            });
        });
    }

    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }

    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }

    function saveTask() {
        const selectedDate = taskDateInput.value;
        const description = taskDescriptionInput.value;
        if (selectedDate && description) {
            fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: selectedDate, description: description })
            })
            .then(response => {
                if (response.ok) {
                    taskDescriptionInput.value = '';
                    taskDescriptionInput.disabled = true;
                    renderCalendar(); // Atualiza o calendário após salvar a tarefa
                } else {
                    alert('Failed to save task');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to save task');
            });
        }
    }

    function showPopup(day) {
        fetch(`/api/tasks?date=${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.Description;
                taskList.appendChild(li);
            });
            taskPopup.style.display = 'flex';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load tasks');
        });
    }

    function closePopup() {
        taskPopup.style.display = 'none';
    }

    prevMonthBtn.addEventListener('click', prevMonth);
    nextMonthBtn.addEventListener('click', nextMonth);
    saveTaskBtn.addEventListener('click', saveTask);
    closePopupBtn.addEventListener('click', closePopup);

    renderCalendar();
}
