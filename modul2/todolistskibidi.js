// Function to add a new task
function addTask(task) {
    const todoList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.className = 
      "border-b border-gray-200 flex items-center justify-between py-4";
    li.innerHTML = `
        <label class="flex items-center">
            <input type="checkbox" class="mr-2">
            <span>${task}</span>
        </label>
        <div>
            <button class="text-red-500 hover:text-red-700
             mr-2 delete-btn">Delete</button>
            <button class="text-blue-500
             hover:text-blue-700 edit-btn">Edit</button>
        </div>
    `;
    todoList.appendChild(li);

    // Add event listener to the checkbox
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function () {
        const taskText = this.nextElementSibling;
        if (this.checked) {
            taskText.classList.add('completed');
        } else {
            taskText.classList.remove('completed');
        }
    });
}

// Event listener for form submission
document.getElementById("todo-form").addEventListener("submit",
    function (event) {
        event.preventDefault();
        const taskInput = document.getElementById("todo-input");
        const task = taskInput.value.trim();
        if (task !== "") {
            addTask(task);
            taskInput.value = "";
        }
    });

// Event listener for delete button click
document.getElementById("todo-list")
  .addEventListener("click",
    function (event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.parentElement.remove();
        }
    });

// Event listener for edit button click
document.getElementById("todo-list")
  .addEventListener("click",
    function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const taskText = event.target.
                parentElement.parentElement.querySelector("span");
            const newText = 
                  prompt("Enter new task", taskText.textContent);
            if (newText !== null) {
                taskText.textContent = newText.trim();
            }
        }
    });

// Add default tasks
const defaultTasks = ["T-pose", "Ambatukam", "Andrew tate", "L-Maxxing"];
defaultTasks.forEach(task => addTask(task));