let input = document.getElementById("inputText")
let list = document.getElementById("list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addList = () => {
    
    const value = input.value
    console.log(value)
    if (value != ""){
        tasks.push(value)
        input.value = ""
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    list.innerHTML = ""
    tasks.forEach((task,index) => {



        list.innerHTML += ` <li class=" my-3 py-3 shadow list-group-item ">
                <div class="row">
                <div class="col-1">
                    <input type="checkbox" class="checkbox" data-index="${index}">
                </div>
                <div class="col-6">
                    <span class=" h4" id="task${index}" > ${task} </span>
                </div>
                <div class="col-4">
                    <button class="edit-button btn btn-drk" data-index="${index}">Edit</button>
                    <button class="delete-button btn btn-drk" data-index="${index}">Delete</button>
                </div>                  
                 </div>    
                </li> `;

    });
}

list.addEventListener("click", event =>{
    if(event.target.classList.contains("delete-button")){
        const index = event.target.getAttribute("data-index")
        tasks.splice(index,1)
        console.log(tasks)
        localStorage.setItem("tasks", JSON.stringify(tasks));
        addList()
    }
    if(event.target.classList.contains("checkbox")){
        const index = event.target.getAttribute("data-index")
        const taskSelected = document.getElementById(`task${index}`)
        if (taskSelected.classList.contains("text-decoration-line-through")){
            taskSelected.classList.remove("text-decoration-line-through")
         }
        else{
            taskSelected.classList.add("text-decoration-line-through")
        }
    }
    if(event.target.classList.contains("edit-button")){
        const index = event.target.getAttribute("data-index")
        const newText = prompt("Edit the task", tasks[index])
        if (newText!=""){
            tasks[index] = newText
            localStorage.setItem("tasks", JSON.stringify(tasks));
            addList()
        }
    }
})