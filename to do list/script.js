const API_URL = "https://todo.arjunkattel.com.np/index2.php";
async function addTask(nameParam, dateParam, doneParam = false, idParam = null, isLoading = false) {
    const name = nameParam || document.getElementById('taskName').value;
    const date = dateParam || document.getElementById('dueDate').value;

    if (!isLoading) {
        if (!name) {
            alert('Enter at least the Task name');
            return;
        }

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: name, date })
        });

        const saved = await res.json();
        idParam = saved.id; 
    }

    const table = document.getElementById('taskTable');
    const row = table.insertRow();

    const checkCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const dateCell = row.insertCell(2);
    const actionCell = row.insertCell(3);

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = doneParam;

    check.onclick = async () => {
        nameCell.classList.toggle('done', check.checked);

        fetch(`${API_URL}?id=${idParam}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done: check.checked })
        });
    };

    checkCell.appendChild(check);

    nameCell.textContent = name;
    dateCell.textContent = date;
    if (doneParam) nameCell.classList.add('done');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = async () => {
        const newName = prompt('Edit task name:', nameCell.textContent);
        const newDate = prompt('Edit due date:', dateCell.textContent);

        if (newName) nameCell.textContent = newName;
        if (newDate) dateCell.textContent = newDate;

        fetch(`${API_URL}?id=${idParam}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: newName, date: newDate })
        });
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = async () => {
        row.remove();

        fetch(`${API_URL}?id=${idParam}`, { method: "DELETE" });
    };

    actionCell.appendChild(editBtn);
    actionCell.appendChild(delBtn);

    if (!isLoading) {
        document.getElementById('taskName').value = '';
        document.getElementById('dueDate').value = '';
    }
}

async function loadTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    tasks.forEach(t => {
        addTask(t.text, t.date, t.done, t.id, true);
    });
}

window.onload = loadTasks;
