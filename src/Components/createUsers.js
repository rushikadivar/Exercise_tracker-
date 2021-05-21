import React, { Component } from 'react';
import axios from 'axios';
 
export default class CreateUser extends Component {

    constructor(props) {
        super(props);

    // We have to BIND all the method to make sure that
    // "this" keyword is the to be used within the Class
    // And it should be in constructor
    
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            userName: '',                    
        }
    }

    onChangeUserName = (e) => {
        this.setState({
            userName: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {
            userName: this.state.userName,
        }

        console.log('Username: ' + user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => { alert("user already exists") });

        this.setState({
            userName: ''
        })
    }

    render() {
        return (        
            <div className="">
                <h3>Create a New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UserName: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.userName}
                            onChange={this.onChangeUserName}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            value="Create User"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}