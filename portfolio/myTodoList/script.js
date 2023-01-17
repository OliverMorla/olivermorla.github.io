// Whenever page loads up completely, it will invoke the function
window.addEventListener("load", () => {
    // Retrieving elements
    const form = document.querySelector("#task-form-container");
    const input = document.querySelector("#task-input");
    const list_el = document.querySelector("#tasks-container");
    
    // When clicking submit it will no longer refresh the page
    form.addEventListener('submit', (e) =>{
        // Stops page from being refreshed when clicking button.
        e.preventDefault();

        // Takes inputted value and stores it into 'newTask'
        const newTask = input.value;

        if(!newTask){
            alert("Please fill out the task");
            return;
        }

        // Creates a div with class 'task-item'
        const task_el = document.createElement("div");
        task_el.classList.add("task-item")

        // Creates a div with class 'task-content'
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("task-content")

        // Creates an input (textbox) with class 'text', value = 'newTask', type = text, and attribute of 'read-only'
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = newTask;
        task_input_el.setAttribute("readonly", "readonly")

        // Creates a div with class 'task-action-buttons'
        const task_action_buttons = document.createElement("div");
        task_action_buttons.classList.add("task-action-buttons");

        // Creates a button with class 'task-edit-button'
        const task_edit_button = document.createElement("button");
        task_edit_button.classList.add("task-edit-button")
        task_edit_button.innerHTML = "Edit" //Changes value of new button to "Edit"

        const task_delete_button = document.createElement("button");
        task_delete_button.classList.add("task-delete-button")
        task_delete_button.innerHTML = "Delete"
        
        // Adds the input/textbox inside the div of 'task-content'
        task_content_el.appendChild(task_input_el)

        task_el.appendChild(task_content_el);
        
        task_action_buttons.appendChild(task_edit_button);
        task_action_buttons.appendChild(task_delete_button);

        task_el.appendChild(task_action_buttons);

        list_el.appendChild(task_el);

        task_edit_button.addEventListener("click", () => {
            if(task_edit_button.innerText.toLowerCase() == "edit"){
                task_input_el.removeAttribute("readonly")
                task_input_el.focus();
                task_edit_button.innerText = "Save"
            } else{
                task_input_el.setAttribute("readonly", "readonly")
                task_edit_button.innerText = "Edit"
            }
        })

        task_delete_button.addEventListener("click", ()=>{
            if(task_delete_button.innerText.toLowerCase() == "delete"){
                list_el.removeChild(task_el)
            }
        })


    })
})