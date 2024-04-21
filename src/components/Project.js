import Task from './Task';

export default class Project {
    constructor(title){
        this.title=title;
        this.tasks = [];
    }
    addTaskIntoProject(task){
        
        this.tasks.push(task);
    }
    removeTask(index){
        this.tasks.splice(index,1);
    }
   
    
}

export const importProjectsFromLocalStorage = (key)=>{
	const allProjects = JSON.parse(localStorage.getItem('allProjects'))?.map((projectObj, index)=>{
			const project = new Project(projectObj.title);
			project.tasks = projectObj.tasks.map(
					({
							title='Default title',
							description='Default description',
							date=Date.now(),
							priority='normal',
							status='incomplete'
					}, index)=>new Task(title, description, date,priority, status)
			);
			return project;
	})
	return allProjects ?? [];
}
export const saveProjectsToLocalStorage = (key, thing) =>
localStorage.setItem(key, JSON.stringify(thing));
