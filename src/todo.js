import React from 'react';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { taches: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = () => {
        const tasks = JSON.parse(localStorage.getItem('task'));
        if (tasks !== "") {
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
        taches: state.taches.concat(newTask),
        text: ''
        }));

      localStorage.setItem("task", JSON.stringify(this.state.taches.concat(newTask)))
    }

    removeTask = (uId) => {
        const updatedTasks = this.state.taches.filter((task) => task.id !== uId);
        this.setState({ taches: updatedTasks });
      };

    render() {
        return (
            <div className="container p-5">
                <div className="row w-75 mx-auto">
                    <div className="col-lg-12 mb-3">
                        <div className="bg-secondary p-3">
                        <h2 className="text-light">Liste des tâches à faire :</h2>
                        <TodoList taches={this.state.taches} />
                        </div>
                    </div>
                    <div className="col-lg-12 mb-3">
                        <form onSubmit={this.handleSubmit} className="bg-warning p-3">
                            <div className="d-flex flex-column">
                                <label htmlFor="addTask">Ajouter vos tâches</label>
                                <input onChange={this.handleChange} value={this.state.text} id="addTask" className="mt-3"/>
                            </div>
                            <button className="btn btn-secondary mt-3">Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } 

}
// TodoList est un composant controlé
 class TodoList extends React.Component {
    render() {
      return (
        <div className="text-light">
          {this.state.taches !== "" ?
            this.props.taches.map(tache => (
            <div key={tache.id}className='border mb-3 p-2 d-flex justify-content-between'>
            <span>{tache.text}</span>
            <button onClick={this.removeTask} className='btn btn-danger '>Supprimer</button>
            </div>
          )):
          console.log("erreur")
          }
        </div>
      );
    }
  }
export default TodoApp;
