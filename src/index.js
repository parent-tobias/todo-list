import "./style.css";
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
        
    })
})
let canClikAgain = true;
addNewProject.addEventListener("click", () => {
    
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
                const p = new Project(projectName.value);
                allProjects.push(p);
                showProject();
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

    
    
})


class Project {
    constructor(title){
        this.title=title;
    }
}
function  showProject(){
    while(projectsList.firstChild){
        projectsList.removeChild(projectsList.lastChild);
    }
    allProjects.forEach(pro => {
        let index = allProjects.indexOf(pro);
        
        const projectBox = document.createElement("div");
    const para = document.createElement("h3");
    para.textContent = pro.title;
    projectBox.appendChild(para);

    const renameProject = document.createElement("button");
    renameProject.textContent = "rename";
    renameProject.addEventListener("click", () => {
       
        

    })
    projectBox.appendChild(renameProject);

    const removeProject = document.createElement("button");
    removeProject.textContent = "remove";
    projectBox.appendChild(removeProject);
    removeProject.addEventListener("click", ()=> {
        allProjects.splice(index,1);
        showProject();
    })

    projectsList.appendChild(projectBox);
    })
    
}
