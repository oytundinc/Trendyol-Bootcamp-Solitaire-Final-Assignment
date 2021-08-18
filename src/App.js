import './App.css';
import React from "react";
import HomePage from './pages/homePage/HomePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router className="App">
        <Switch>
          <Route>
            <HomePage/>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
