document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskMessage= document.getElementById('taskMessage');
    const maxWidth = 357; 

    taskInput.addEventListener('input', () => {
        if (isWidthExceeded(taskInput.value)) {
            taskInput.value = truncateText(taskInput.value);
        }
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            updateTaskMessage();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
            updateTaskMessage();
        } else if (e.target.classList.contains('complete')) {
            const taskItem = e.target.parentElement.parentElement;
            const taskText= taskItem.querySelector('span');
            taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            updateTaskMessage();
        }
    });

    function updateTaskMessage()
    {
        const tasks= taskList.getElementsByTagName('li');
        const totalTasks= tasks.length;
        let completeTasks=0;

        for(let task of tasks)
        {
            if(task.querySelector('span').style.textDecoration === 'line-through')
            {
                completeTasks += 1;
            }
        }

        taskMessage.textContent= `${completeTasks} tasks done out of ${totalTasks}`
    }

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div class="buttons">
                <button class="complete">✓</button>
                <button class="delete">X</button>
            </div>
        `;
        taskList.appendChild(li);
    }

    function isWidthExceeded(text) {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'nowrap';
        span.textContent = text;
        document.body.appendChild(span);
        const widthExceeded = span.offsetWidth > maxWidth;
        document.body.removeChild(span);
        return widthExceeded;
    }

    function truncateText(text) {
        while (isWidthExceeded(text)) {
            text = text.slice(0, -1);
        }
        return text;
    }

});



