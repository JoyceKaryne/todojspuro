
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list-container");

const searchInput = document.querySelector("#search-input");
const filterSelect = document.querySelector("#filter-select");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTasks() {
    todoList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    tasks.forEach((task, index) => {

        if (!task.text.toLowerCase().includes(searchText)) {
            return;
        }

        if (filter === "done" && !task.done) {
            return;
        }

        if (filter === "todo" && task.done) {
            return;
        }

        const li = document.createElement("li");
        li.classList.add("todo");

        const title = document.createElement("h3");
        title.textContent = task.text;

        if (task.done) {
            title.classList.add("done");
        }

        
        const doneButton = document.createElement("button");
        doneButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        doneButton.classList.add("done-btn");

        doneButton.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            showTasks();
        });

        
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", () => {
            const newText = prompt("Edite sua tarefa:", task.text);

            if (newText !== null && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                saveTasks();
                showTasks();
            }
        });

        
        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeButton.classList.add("remove-btn");

        removeButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        });

        li.appendChild(title);
        li.appendChild(doneButton);
        li.appendChild(editButton);
        li.appendChild(removeButton);

        todoList.appendChild(li);
    });
}


todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        done: false
    });

    saveTasks();
    showTasks();

    todoInput.value = "";
});


searchInput.addEventListener("keyup", showTasks);


filterSelect.addEventListener("change", showTasks);


showTasks();
