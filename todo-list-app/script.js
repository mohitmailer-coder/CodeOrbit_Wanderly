
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks in localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display all tasks
function showTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("done");
        }

        // Mark task complete or incomplete
        span.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            showTasks();
        };

        // Create Delete button
        let btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.className = "delete-btn";

        btn.onclick = function() {
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        };

        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

// Add a new task
function addTask() {
    let input = document.getElementById("task");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    input.value = "";

    saveTasks();
    showTasks();
}

// Show saved tasks when the page opens
showTasks();
