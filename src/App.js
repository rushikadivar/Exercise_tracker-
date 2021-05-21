import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./Components/navbar";
import ExerciseList from "./Components/exerciseList";
import EditExercise from "./Components/editExercise";
import CreateExercise from "./Components/createExercise";
import CreateUser from "./Components/createUsers";
 
function App() {
  return (
    // Router to navigate within different Components
    <Router>
      <div className="container">
      <Navbar /> 
        <Route path="/" exact component={ExerciseList} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/edit/:id" component={EditExercise} />      
        <Route path="/user" component={CreateUser} />     
      </div>
       
    </Router>
  );
}

export default App;
