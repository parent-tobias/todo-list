import "./style.css";
import { startOfDay,getDate } from "date-fns";

const rightBar = document.querySelector(".rightBar");
const allTasks = document.querySelector("#allTasks");
const tasksInRight = document.querySelector(".tasksInRight");
const btnAddNewTask = document.querySelector(".btnAddNewTask");
const addNewProject = document.querySelector(".addNewProject");
const barTitle = document.querySelector(".barTitle");
const projectsList = document.querySelector(".projectsList");
let allProjects = [];

class Task {
    constructor(title, description, date, priority, status){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.status = status;
    }
}


const boxHome = document.querySelectorAll(".boxHome");
// boxHome.forEach(el => {
     
//     el.addEventListener('click', () => {
//         rightBar.innerHTML ="";  
//         barTitle.innerHTML = el.innerHTML;
        
//     })
// })
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

            const datePara = document.createElement("p");
            datePara.textContent = "Pick a date";
            taskBox.appendChild(datePara);
        
            const datePicker = document.createElement("input");
            datePicker.setAttribute('type', 'date');
            taskBox.appendChild(datePicker);

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
                
                task.date = datePicker.value;
                makeTask(task);
                pro.addTaskIntoProject(task);
                
                
            
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
    

    projectBox.appendChild(renameProject);

    const removeProject = document.createElement("button");
    removeProject.textContent = "remove";
    projectBox.appendChild(removeProject);
    removeProject.addEventListener("click", ()=> {
        allProjects.splice(index,1);
        barTitle.value = "";
        btnAddNewTask.innerHTML = "";
        tasksInRight.innerHTML = "";
        makeProject();
    })

    projectsList.appendChild(projectBox);
    })
    
}
function makeTask(task){
    const taskBox = document.createElement("div");
    taskBox.classList.add("taskBox");
    const title = document.createElement("p");
    title.textContent = task.title;
    taskBox.appendChild(title);

    const description = document.createElement("p");
    description.textContent = task.description;
    taskBox.appendChild(description);

    const date = document.createElement("p");
    date.textContent = task.date;
    taskBox.appendChild(date);


    const importance = document.createElement("p");
    importance.textContent = task.priority;
    taskBox.appendChild(importance);

    const done = document.createElement("button");
    done.textContent = "unfinished";
    task.status = "unfinished"
    done.style.backgroundColor ="red";
    done.addEventListener("click", ()=>{
        if(done.textContent == "unfinished"){
            done.style.color = "white";
            done.style.backgroundColor ="green";
            done.textContent = "finished";
            task.status = "finished"
        } 
        else if(done.textContent == "finished"){
            done.style.backgroundColor ="red";
            done.style.color = "black";
             done.textContent = "unfinished";
             task.status = "unfinished"
        }
        

    })
    taskBox.appendChild(done);

    tasksInRight.appendChild(taskBox);
 }


allTasks.addEventListener("click" , () => {
   
    barTitle.textContent = allTasks.innerHTML;
    btnAddNewTask.innerHTML = "";
    tasksInRight.innerHTML = "";
    allProjects.forEach(project => {
        project.tasks.forEach(taskInProject => {
            makeTask(taskInProject);
            
          })
    })
})