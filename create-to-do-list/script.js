document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskMessage= document.getElementById('taskMessage');
    const maxWidth = 345; 

    taskInput.addEventListener('input', () => {
        /*HTML öğesinin genişliğinin sınırı aşıp aşmadığına bakar*/
        if (isWidthExceeded(taskInput.value)) {
           /*metin uzunluğunu belirli sınırda kesmek, metni kısaltmak için kullanılır, metot*/ 
           taskInput.value = truncateText(taskInput.value);
        }
    });

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            updateTaskMessage();
            taskInput.focus();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.parentElement.remove();
            updateTaskMessage();
            /*bir öğenin diğer bir öğeyi içerip içermediğini kontrol etmek için kullanılan metot*/
        } else if (e.target.classList.contains('complete')) {
            const taskItem = e.target.parentElement.parentElement;
            /*HTML belgesinde belirli bir CSS seçicisine uygun ilk öğeyi seçmek için kullanılan metot*/
            const taskText= taskItem.querySelector('span');
            taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            updateTaskMessage();
        }
    });

    function updateTaskMessage()
    {
        /*HTML dokümanında belirli bir etiket adına sahip tüm öğeleri seçer*/
        const tasks= taskList.getElementsByTagName('li');
        const totalTasks= tasks.length;
        let completeTasks=0;

        /*for...of döngüsünü kullanarak koleksiyon üzerinde işlem yapmamızı sağlar*/
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
        /*bir HTML öğesini başka bir öğenin çocuk öğesi olarak ekle*/
        taskList.appendChild(li);
    }
    /*metnin genişliğinin verilen maksimum genişlikten aşılıp aşılmadığını kontrol edilir*/
    function isWidthExceeded(text) {
        /*yeni bir span öğesi oluştu, span değişkenine atıldı*/
        const span = document.createElement('span');
        /*span öğesinin görünürlüğü hidden yapıldı*/
        span.style.visibility = 'hidden';
        /*metnin bir satıra sığmasını ve satır sonuna geçmesini engeller*/
        span.style.whiteSpace = 'nowrap';
        /*span değişkeninin değeri, text oldu*/
        span.textContent = text;
        /*span değişkeni, .body'nin çocuk öğesi oldu*/
        document.body.appendChild(span);
        /*span değişkeninin genişliğni ölçer, maxWidth ile genişliğin aşılıp aşılmadığını kontrol eder*/
        const widthExceeded = span.offsetWidth > maxWidth;
        /*.body'nin çocuk öğesi olan span oradan kaldırılır*/
        document.body.removeChild(span);
        /*metnin genişliğinin maxWidth'i aşıp aşmadığını belirten boolean değeri döndürür.*/
        return widthExceeded;
    }

    function truncateText(text) {
        /*while döngüsünü başlatır. isWidthExceeded(text) fonksiyonunun true olduğu sürece devam*/
        while (isWidthExceeded(text)) {
            /*text metninin son karakterini kesip daha sonra returnla döndürür*/
            text = text.slice(0, -1);
        }
        return text;
    }

});



