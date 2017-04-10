import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const ProjectForm = ({addProject}) => {
  // Input Tracker
  let input;
  // Return JSX
  return (
    <div className="addproject">
      <label><b>Add Project</b></label>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        addProject(input.value);
        input.value = '';
      }}>
        +
      </button>
      <center>
        Done Projects
      </center>
    </div>
  );
};

const Project = ({project, remove}) => {
  // Each Project
  return (<div className = "projectlist" onClick={() => {remove(project.text)}}>{project.text}</div>);
}

const DoneProject = ({doneProject}) => {
  // Each  done Project
  return (<div className = "finallist" >{doneProject.text}</div>);
}

const ProjectList = ({projects, remove}) => {
  // Map through the project
  //console.log(project);
  const projectNode = projects.map((project) => {
    console.log(project.text);

    return (<Project project={project} key={project.id} remove={remove}/>)
  });
  return (<div>{projectNode}</div>);
}





const FinalList = ({doneprojects}) => {
  // Map through the projects

  const doneprojectNode = doneprojects.map((doneProject) => {
    console.log(doneProject.text);
    return (<DoneProject doneProject={doneProject} key={doneProject.id}/>)
  });
  return (<div>{doneprojectNode}</div>);
}



// Contaner Component
// Project Id
window.id = 0;
class ProjectApp extends React.Component{
  constructor(props){
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      done:[]
    }
  }
  // Add project handler
  addProject(val){
    // Assemble data
    const project = {text: val, id: window.id++}
    // Update data
    this.state.data.push(project);
    // Update state
    this.setState({data: this.state.data});
  }

  // Handle remove
  handleRemove(val){
    // const doneproject = this.state.data.filter((project) => {
    //   if(project.id == id)
    //     console.log("Mil gaya "+project);
    //     this.state.done.push(project);
    //     console.log(this.state.done);
    //     return project;
    // });

    const doneproject = {text:val};
    this.state.done.push(doneproject);


    // Filter all projects except the one to be removed
    const remainder = this.state.data.filter((project) => {
      if(project.text !== val) return project;
    });

    // Update state with filter
    this.setState({data: remainder});
   this.setState({done: this.state.done});

  }

  render(){
    // Render JSX
    return (
      <div>

        <div class = "projectlist">
          <ProjectForm addProject={this.addProject.bind(this)}/>
          <ProjectList
            projects={this.state.data}
            remove={this.handleRemove.bind(this)}
          />
        </div>
        <center>
          <div class = "finallist">

            <FinalList
              doneprojects={this.state.done}
            />
          </div>
        </center>
      </div>
    );
  }
}
ReactDOM.render(<ProjectApp />, document.getElementById('container'));
