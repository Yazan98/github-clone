import './App.scss';
import {HashRouter, Route, Switch} from "react-router-dom";
import React from "react";
import {HomePage} from "./components/pages/HomePage";
import GithubUsernamePage from "./components/pages/GithubUsernamePage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/profile" component={GithubUsernamePage}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
