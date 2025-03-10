// select html elements
const inputBox = document.getElementById("input-box"); //input field for tasks
const listContainer = document.getElementById("list-container"); //where tasks will be shown
const addButton = document.getElementById("input-button"); //add task button

// Add event listener to the "Add Task" button
addButton.addEventListener("click", addTask);

// Load saved tasks from LocalStorage when the page is loaded
window.addEventListener("load", () => {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    listContainer.querySelectorAll("li").forEach(li => {
        addButtonEventListeners(li); // makse sure all buttons work
    });
});


//function to add event listeners to task buttons
function addButtonEventListeners(li) {
    const completeButton = li.querySelector(".complete-button"); //complete button
    const deleteButton = li.querySelector(".delete-button"); //delete button

    //complete task
    if (completeButton) {
        completeButton.addEventListener("click", () => {
            li.classList.toggle("Completed");
            saveTasks(); //save updated tasks
        });
    }
    //delete- task
    if (deleteButton) {
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks(); //save updated tasks
        });
    }
}


// Function to add a new task to the list
function addTask() {
    const task = inputBox.value.trim(); //get input

    //checks if input is empty
    if (!task) { 
        inputBox.style.border = "2px solid red"; 
        alert("Please add your task");
        return;
    }
    inputBox.style.border = ""; //reset border if input is ok

    const li = document.createElement("li"); 
    li.innerHTML = `${task} 
        <button class="complete-button">Completed</button>
        <button class="delete-button">Delete</button>`;
    
    listContainer.appendChild(li); 
    addButtonEventListeners(li); // makes buttons work
    
    inputBox.value = ""; //clear input field
    saveTasks(); //save tasks
}


// Function to save all tasks to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML); 
    // Save the entire list as HTML string
}


