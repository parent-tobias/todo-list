import "./style.css";


const tasksInRight = document.querySelector(".tasksInRight");
const btnAddNewTask = document.querySelector(".btnAddNewTask");
const addNewProject = document.querySelector(".addNewProject");
const barTitle = document.querySelector(".barTitle");
const projectsList = document.querySelector(".projectsList");
let allProjects = [];

class Task {
    constructor(title, description, date, priority){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}


const boxHome = document.querySelectorAll(".boxHome");
boxHome.forEach(el => {
     
    el.addEventListener('click', () => {
        barTitle.innerHTML = el.innerHTML;
        tasksInRight.innerHTML ="";  
    })
})
let canClikAgain = true;



function forAddingNewProject(){
    if(canClikAgain){
        
        
        const newProject = document.createElement("div");
        newProject.classList.add("newProject");
    

        const projectName = document.createElement("input");
    
         newProject.appendChild(projectName);
        projectName.classList.add("projectName");
        

        const btnAddProject = document.createElement("button");
        btnAddProject.textContent = "Add";
        newProject.appendChild(btnAddProject);
        btnAddProject.classList.add("btnAddProject");
    
        btnAddProject.addEventListener("click", () => {
            if(projectName.value == ""){
                alert("You must fill input with some value");
            } else{
                projectsList.removeChild(projectsList.lastChild);
                const p = new Project();
                p.title = projectName.value
                
                allProjects.push(p);
                makeProject();
                canClikAgain = true;
            }
        })

        const btnCancelProject = document.createElement("button");
        btnCancelProject.textContent = "Cancel";
        newProject.appendChild(btnCancelProject);
        btnCancelProject.addEventListener("click", () => {
        projectsList.removeChild(projectsList.lastChild);
        canClikAgain = true;

        })

        btnCancelProject.classList.add("btnCancelProject");


        
      

        projectsList.appendChild(newProject);
        canClikAgain = false;
    }
}
console.log(allProjects);


addNewProject.addEventListener("click", () => {
    
    forAddingNewProject();

    
    
})


class Project {
    constructor(title){
        this.title=title;
        this.tasks = [];
    }
    addTaskIntoProject(task){
        
        this.tasks.push(task);

    }
    
}
 
function  makeProject(){
    while(projectsList.firstChild){
        projectsList.removeChild(projectsList.lastChild);
    }
    allProjects.forEach(pro => {
        let index = allProjects.indexOf(pro);
        
    const projectBox = document.createElement("div");
    const para = document.createElement("p");
    para.textContent = pro.title;
    projectBox.appendChild(para);

    const renameProject = document.createElement("button");
    renameProject.textContent = "rename";
    renameProject.addEventListener("click", () => {
        
        //rename project

    })
    let taksBtnCreated = false;

    projectBox.addEventListener("click", () => {
        barTitle.innerHTML = pro.title;
        
      tasksInRight.innerHTML = "";
        
      pro.tasks.forEach(taskInProject => {
        makeTask(taskInProject);
      })


        if(taksBtnCreated == false){
            while(btnAddNewTask.firstChild){
                btnAddNewTask.removeChild(btnAddNewTask.lastChild);
            }
            const createBtn = document.createElement("button");
        createBtn.textContent= "+Add";
        btnAddNewTask.appendChild(createBtn);

        

        createBtn.addEventListener("click", () =>{
            // task = new Task();
            const taskBox = document.createElement("div");
            const taskTitle = document.createElement("p");
            taskTitle.textContent = "Title:";
            taskBox.appendChild(taskTitle);
            
            const taskTitleInput = document.createElement("input");
            taskBox.appendChild(taskTitleInput);

            const taskDetails = document.createElement("p");
            taskDetails.textContent = "Details:";
            taskBox.appendChild(taskDetails);

            const taskDetailsInput = document.createElement("input");
            taskBox.appendChild(taskDetailsInput);

            const importance = document.createElement("p");
            importance.textContent = "priority?";
            taskBox.appendChild(importance);
            const imp = document.createElement("button");
            imp.textContent = "not priority";
            imp.style.color = "black";
            
            taskBox.appendChild(imp);
            imp.addEventListener("click" , ()=> {
                if(imp.textContent == "not priority"){
                    imp.style.color = "white";
                    imp.style.backgroundColor ="green";
                    imp.textContent = "priority";
                } 
                else if(imp.textContent == "priority"){
                    imp.style.backgroundColor ="red";
                    imp.style.color = "black";
                    imp.textContent = "not priority";
                }
            })

            

            const add = document.createElement("button");
            add.textContent = "Add";
            taskBox.appendChild(add);
        add.classList.add("add");
    
        add.addEventListener("click", () => {
            
            tasksInRight.removeChild(tasksInRight.lastChild);
                const task = new Task();
                task.title = taskTitleInput.value;
                task.description = taskDetailsInput.value;
                if(imp.textContent == "not priority"){
                    task.priority = "not priority";
                } else if(imp.textContent == "priority"){
                    task.priority = "priority";
                }
                pro.addTaskIntoProject(task);
                
                makeTask(task);
                
            
        })

         

        const btnCancelTask = document.createElement("button");
        btnCancelTask.textContent = "Cancel";
        taskBox.appendChild(btnCancelTask);
        btnCancelTask.addEventListener("click", () => {
            tasksInRight.removeChild(tasksInRight.lastChild);
        

        })

            tasksInRight.appendChild(taskBox);


        })



        taksBtnCreated = true;
        
        }
        
    })
    function makeTask(task){
        const taskBox = document.createElement("div");
        taskBox.classList.add("taskBox");
        const title = document.createElement("p");
        title.textContent = task.title;
        taskBox.appendChild(title);

        const description = document.createElement("p");
        description.textContent = task.description;
        taskBox.appendChild(description);

        const importance = document.createElement("p");
        importance.textContent = task.priority;
        taskBox.appendChild(importance);

        const done = document.createElement("button");
        done.textContent = "unfinished";
        
        done.style.backgroundColor ="red";
        done.addEventListener("click", ()=>{
            if(done.textContent == "unfinished"){
                done.style.color = "white";
                done.style.backgroundColor ="green";
                done.textContent = "finished";
            } 
            else if(done.textContent == "finished"){
                done.style.backgroundColor ="red";
                done.style.color = "black";
                 done.textContent = "unfinished";
            }
            

        })
        taskBox.appendChild(done);

        tasksInRight.appendChild(taskBox);
     }


    projectBox.appendChild(renameProject);

    const removeProject = document.createElement("button");
    removeProject.textContent = "remove";
    projectBox.appendChild(removeProject);
    removeProject.addEventListener("click", ()=> {
        allProjects.splice(index,1);

        makeProject();
    })

    projectsList.appendChild(projectBox);
    })
    
}
