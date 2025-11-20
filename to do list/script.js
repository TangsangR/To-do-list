function addTask() {
    const name = document.getElementById('taskName').value;
    const date = document.getElementById('dueDate').value;
    if (!name){
        alert('Enter atleast the Task name');
        return;
        } 
    const table = document.getElementById('taskTable');
    const row = table.insertRow();
    const checkCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const dateCell = row.insertCell(2);
    const actionCell = row.insertCell(3);
    
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.onclick = () => {
        if (check.checked) {
            nameCell.classList.add('done');
        }
        else {
            nameCell.classList.remove('done');
    }
};
check.addEventListener('mouseover', function() { 
    check.style.transform = 'scale(1.2)'; 
    check.style.transition = 'all 0.1s ease'; 
});

check.addEventListener('mouseout', function() {
    check.style.transform = 'scale(1)';
});

checkCell.appendChild(check);
nameCell.textContent = name;
dateCell.textContent = date;

      // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
        const newName = prompt('Edit task name:', nameCell.textContent);
        const newDate = prompt('Edit due date:', dateCell.textContent);
        if (newName) nameCell.textContent = newName;
        if (newDate) dateCell.textContent = newDate;
};
    editBtn.addEventListener('mouseover', function() {
    editBtn.style.backgroundColor = '#c2f23fff';
    editBtn.style.transform = 'scale(1.05)'; 
    editBtn.style.transition = 'all 0.3s ease'; 
    });
    editBtn.addEventListener('mouseout', function() {
    editBtn.style.backgroundColor = ''; 
    editBtn.style.transform = 'scale(1)';
});

      // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => row.remove();
    delBtn.addEventListener('mouseover', function() {
    delBtn.style.backgroundColor = '#ff6b35';
    delBtn.style.transform = 'scale(1.05)'; 
    delBtn.style.transition = 'all 0.3s ease'; 
    });
    delBtn.addEventListener('mouseout', function() {
    delBtn.style.backgroundColor = ''; 
    delBtn.style.transform = 'scale(1)';
});
    actionCell.appendChild(editBtn);
    actionCell.appendChild(delBtn);

    document.getElementById('taskName').value = '';
    document.getElementById('dueDate').value = '';
}