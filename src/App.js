import './App.css';
import React from "react";
import HomePage from './pages/homePage/HomePage';
import GamePage from './pages/gamePage/GamePage';
import { BrowserRouter as Switch, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={GamePage}></Route>
          <Route path="/HomePage" component={HomePage}></Route>
        </Switch>
    </BrowserRouter>
    
  );
}

export default App;
