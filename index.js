const newTaskName = document.querySelector(".new-task-name")
const newTaskText = document.querySelector(".new-task-text")
const creationFormToggleBtn = document.querySelector(".mng-new")
const creationFormDiv = document.querySelector(".create-form")
const creationSubmitBtn = document.querySelector(".new-task-submit")

creationFormDiv.style.display = "none"

if (!localStorage.getItem('tasks')) {
    localStorage.setItem('tasks', '[]')
}

creationFormToggleBtn.addEventListener('click', (e) => {
    if (creationFormDiv.style.display !== "none") {
        creationFormDiv.style.display = "none"
    } else {
        creationFormDiv.style.display = 'flex'
    }
})

creationSubmitBtn.addEventListener('click', () => {
    addTask(getTaskCreateObj())
})

function el(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    return div.firstChild;
}

function genTaskElement(obj) {
    return `
        <div class="task listed ${obj.marked ? "marked" : ""}">
            
            <h1>
                ${obj.title}
            </h1>
            <p>
                ${obj.text}
            </p>
            <div class="task-footer">
                <button class="huge-sign" onclick="${obj.marked ? "unmarkTask('"+obj.title+"')" : "markTask('"+obj.title+"')"}">${obj.marked ? "✗" : "✓"}</button>
                <button class="huge-sign" onclick="deleteTaskByName('${obj.title}')">🗑</button>
            </div>
        </div>
    `
}

function addTask(taskObj) {
    let oldList = JSON.parse(localStorage.getItem('tasks'));
    oldList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(oldList));
    let newTask = el(genTaskElement(taskObj));
    document.querySelector(".task-list").appendChild(newTask);
    setTimeout(() => { document.querySelector(".task-list").lastElementChild.style.transform = "translateX(0)" }, 1)
}

function markTask(taskName) {
    let newArr = JSON.parse(localStorage.getItem('tasks')).map((task) => {
        if (task.title === taskName) {
            task.marked = true;
        }
        return task
    })
    localStorage.setItem('tasks', JSON.stringify(newArr))
    updateTasks(false)
}

function unmarkTask(taskName) {
    let newArr = JSON.parse(localStorage.getItem('tasks')).map((task) => {
        if (task.title === taskName) {
            task.marked = false;
        }
        return task
    })
    localStorage.setItem('tasks', JSON.stringify(newArr))
    updateTasks(false)
}

function deleteTaskByName(taskName) {
    let newArr = JSON.parse(localStorage.getItem('tasks')).filter(task => task.title != taskName)
    localStorage.setItem('tasks', JSON.stringify(newArr))
    updateTasks(false)
}

function clearTasks() {
    localStorage.setItem('tasks', JSON.stringify([]))
    updateTasks(false)
}


function getTaskCreateObj() {
    return {
        "title": newTaskName.value,
        "text": newTaskText.value,
        "marked": false
    }
}

function updateTasks(anim) {
    let content = ``;
    document.querySelector(".task-list").innerHTML = ""
    getTasks().forEach(element => {
        let newTask = el(genTaskElement(element))
        document.querySelector(".task-list").appendChild(newTask);
        console.log();
    });
    document.querySelectorAll(".listed").forEach((el, index) => {
        setTimeout(() => {
            if (anim) {
                el.style.transition = "0.4s linear";
            }
            setTimeout(() => { el.style.transform = "translateX(0px)"; }, 1)
        }, anim ? (200 * index) : 0)
    })
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
}