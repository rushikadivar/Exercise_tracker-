import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

    // We have to BIND all the method to make sure that
    // "this" keyword is the to be used within the Class
    // And it should be in constructor
    
    // this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            userName: '',
            description: '',
            duration: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
          .then(res => {
            this.setState({
              userName: res.data.userName,
              description: res.data.description,
              duration: res.data.duration,
              date: new Date(res.data.date),
              users: res.data.userName,
            })   
          })
          .catch((error) => {
            console.log(error);
          })

          console.log(this.state.users);
    
        // axios.get('http://localhost:5000/users/')
        //   .then(res => {
        //     if (res.data.length > 0) {
        //       this.setState({
        //         users: res.data.map(user => user.userName),
        //       })
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   })
    
      }


    // Now we have the methods to update the changes in With state update

    // onChangeUserName = (e) => {
    //     this.setState({
    //         userName: e.target.value
    //     })
    // }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
            date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const exercise = {
            userName: this.state.userName,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        this.setState({
            userName: ''
        })

        window.location = "/";
    }


    render() {
        return (
            <div className="container p-3">
                <div className="">
                    <h3>Create a New Exercise</h3>
                    <form className="form" onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <select 
                                // ref="userInput"
                                required
                                className="form-control"
                                value={this.state.userName}
                                // onChange={this.onChangeUserName}
                                >
                                    {/* {
                                        this.state.users.map((user) => {
                                            return (
                                                <option 
                                                    key={user}
                                                    value={this.state.userName}>
                                                    {this.state.userName}
                                                </option>
                                            )
                                        })
                                    }       */}
                                    {
                                        <option>
                                            {this.state.users}
                                        </option>
                                    }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input 
                                type="text" 
                                required
                                className="form-control"
                                value={this.state.description} 
                                onChange={this.onChangeDescription}
                                placeholder="Enter the Exercise description"
                            />
                        </div> 
                        <div className="form-group">
                            <label>Duration (in minutes)</label> 
                            <input  
                                type="number"
                                required 
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date: </label>
                            <div className="">
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                            </div>
                            
                        </div>    

                        <div className="form-group">
                            <input 
                                type="submit"
                                value="Update Exercise Log"
                                className="btn btn-primary"
                            />
                        </div>               
                    </form>
                </div>
            </div>
        )
    }
}