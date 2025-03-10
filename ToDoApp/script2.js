// Select necessary elements from the HTML
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("input-button");

// Add event listener to the "Add Task" button
addButton.addEventListener("click", addTask);

// Load saved tasks from LocalStorage when the page is loaded
window.addEventListener("load", () => {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    listContainer.querySelectorAll("li").forEach(li => {
        addButtonEventListeners(li); // Varmistetaan, että kaikilla napeilla on tapahtumakäsittelijät
    });
});


//function to add event listeners to task buttons
function addButtonEventListeners(li) {
    const completeButton = li.querySelector(".complete-button");
    const deleteButton = li.querySelector(".delete-button");

    if (completeButton) {
        completeButton.addEventListener("click", () => {
            li.classList.toggle("Completed");
            saveTasks();
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });
    }
}


// Function to add a new task to the list
function addTask() {
    const task = inputBox.value.trim(); 
    if (!task) { 
        inputBox.style.border = "2px solid red"; 
        alert("Please add your task");
        return;
    }
    inputBox.style.border = ""; 

    const li = document.createElement("li"); 
    li.innerHTML = `${task} 
        <button class="complete-button">Completed</button>
        <button class="delete-button">Delete</button>`;
    
    listContainer.appendChild(li); 
    addButtonEventListeners(li); // Lisää tapahtumakäsittelijät
    
    inputBox.value = ""; 
    saveTasks(); 
}


// Function to save all tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML); 
    // Save the entire list as HTML string
}


