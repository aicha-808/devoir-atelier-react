import React from 'react';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { taches: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeTask = this.removeTask.bind(this);
    }

    componentDidMount = () => {
        const tasks = JSON.parse(localStorage.getItem('task'));
        if (tasks !== null) {
            this.setState({taches: tasks})
        }
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newTask = {
        text: this.state.text,
        id: Date.now()
        };
        this.setState(state => ({
            taches: state.taches ? state.taches.concat(newTask) : [newTask],
            text: ''
        }));
        
        
      localStorage.setItem("task", JSON.stringify(this.state.taches.concat(newTask)))
    }

    removeTask = (uId) => {
        const updatedTasks = this.state.taches.filter((task) => task.id !== uId);
        this.setState({ taches: updatedTasks });
    
        // Mettez à jour le localStorage ici
        localStorage.setItem("task", JSON.stringify(updatedTasks));
    };
    

    render() {
        return (
            <div className="container p-5">
                <div className="row w-75 mx-auto">
                    
                    <div className="col-lg-12 mb-3">
                        <form onSubmit={this.handleSubmit} className="bg-warning p-3">
                            <div className="d-flex flex-column">
                                <label htmlFor="addTask">Ajouter vos tâches</label>
                                <input onChange={this.handleChange} value={this.state.text} id="addTask" className="mt-3"/>
                            </div>
                            <button className="btn btn-secondary mt-3">Ajouter</button>
                        </form>
                    </div>
                    <div className="col-lg-12 mb-3">
                        <div className="bg-secondary p-3">
                        <h2 className="text-light">Liste des tâches à faire :</h2>
                        <TodoList taches={this.state.taches} removeTask={this.removeTask}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 

}
// TodoList est un composant controlé
 class TodoList extends React.Component {
    render() {
        //  const { taches } = this.props;
      return (
        <div>
            {this.props.taches && (
               <div className="text-light">
                    {this.props.taches.map(tache => {
                        return (<div key={tache.id}className='border mb-3 p-2 d-flex justify-content-between'>
                        <span>{tache.text}</span>
                        <button  onClick={() => this.props.removeTask(tache.id)} className='btn btn-danger '>Supprimer</button>
                        </div>
                        )})
                    }
                </div>
            )}
        </div>
        
      )
    }
  }
export default TodoApp;
