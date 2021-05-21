import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Exercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.userName}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <button className="btn btn-dark" onClick={ () => { props.deleteExercise(props.exercise._id) }}>delete</button> 
            </td>
        </tr>
    )
    
}

export default class ExerciseList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises: [],
        }        
    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises/")
        .then((response) => { 
            (response.data.length > 0) ? 
            this.setState({
                exercises: response.data.map(exercise => exercise) 
            }) : console.log("No users found")                 
        })
        .catch((err) => { console.log(err) });        
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

            this.setState({
                exercises: this.state.exercises.filter(exercise => exercise._id !== id)
            })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={ currentExercise } deleteExercise={ this.deleteExercise } key={ currentExercise._id }/>;            
        })
    }
    


    render() {
        return (
            <div className="">
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>

            </div>
        )
    }
}