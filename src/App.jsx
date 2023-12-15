import { useState } from 'react';
import ProjectsSidebar from './components/ProjectsSidebar.jsx'
import NewProject from "./components/NewProject"
import NoProjectSelected from './components/NoProjectSelected.jsx';
import SelectedProject from './components/SelectedProject.jsx';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    projects: [],
    tasks: []
  });

  //PROJECTS --------------------------------------------------------------------------------
  function startAddProjectHandler() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectID: null,
      }
    })
  }

  //this function finishes adding a project
  function addProjectHandler(projectData) {
    const projectID = Math.random();
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: projectID
      }

      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      }
    })
  }

  function cancelAddProjectHandler() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      }
    })
  }

  function selectProjectHandler(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectID: id,
      }
    })
  }

  function deleteProjectHandler() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectID)
      }
    })
  }

  //TASKS --------------------------------------------------------------------------------
  function addTaskHandler(taskText) {
    setProjectsState(prevState => {
      const taskID = Math.random();
      const newTask = {
        text: taskText,
        projectID : prevState.selectedProjectID,
        id: taskID
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      }
    })
  }

  function deleteTaskHandler(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  //CONTENT --------------------------------------------------------------------------------
  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectID);
  const selectedProjectTasks = projectsState.tasks.filter((task) => task.projectID === projectsState.selectedProjectID);

  let content = <SelectedProject 
  projectData={selectedProject} 
  onDeleteProject={deleteProjectHandler} 
  onAddTask={addTaskHandler}
  onDeleteTask={deleteTaskHandler} 
  tasks={selectedProjectTasks} />;


  if (projectsState.selectedProjectID === null) {
    content = <NewProject addProjectHandler={addProjectHandler} onCancelAddProject={cancelAddProjectHandler} />
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProjectSelected onStartAddProject={startAddProjectHandler} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar 
      onStartAddProject={startAddProjectHandler} 
      onSelectProject={selectProjectHandler} 
      projects={projectsState.projects}
      selectProjectID={projectsState.selectedProjectID}
       />
      {content};
    </main>
  );
}

export default App;
