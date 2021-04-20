const newTaskName = document.querySelector(".new-task-name")
const newTaskText = document.querySelector(".new-task-text")
const creationFormToggleBtn = document.querySelector(".mng-new")
const creationFormDiv = document.querySelector(".create-form")
const creationSubmitBtn = document.querySelector(".new-task-submit")

creationFormDiv.style.display = "none"

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

    // Change this to div.childNodes to support multiple top-level nodes
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
            ${obj.marked ? "marked" : "unmarked"}
            <div class="task-footer">
                <button class="huge-sign" onclick="markTask('${obj.title}', this)">✓</button>
                <button class="huge-sign" onclick="deleteTaskByName('${obj.title}')">🗑</button>
            </div>
        </div>
    `
}

function addTask(taskObj) {
    let oldList = JSON.parse(localStorage.getItem('tasks'));
    oldList.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(oldList));
    updateTasks()
}

function markTask(taskName, this_) {
    let newArr = JSON.parse(localStorage.getItem('tasks')).map((task) => {
        if (task.title === taskName) {
            task.marked = true;
        }
        return task
    })
    localStorage.setItem('tasks', JSON.stringify(newArr))
    updateTasks()
}

function deleteTaskByName(taskName) {
    let newArr = JSON.parse(localStorage.getItem('tasks')).filter(task => task.title != taskName)
    localStorage.setItem('tasks', JSON.stringify(newArr))
    updateTasks()
}

function clearTasks() {
    localStorage.setItem('tasks', JSON.stringify([]))
    updateTasks()
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
    getTasks().forEach(element => {
        let newTask = el(genTaskElement(element))
        document.querySelector(".task-list").appendChild(newTask);
        console.log();
    });
    document.querySelectorAll(".listed").forEach((el, index) => {
        setTimeout(() => { el.style.transform = "translateX(0px)"; }, anim ? (200 * index) : 0)
    })
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks"));
}