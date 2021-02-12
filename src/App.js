import './App.scss';
import {HashRouter, Route, Switch} from "react-router-dom";
import React from "react";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          {/*<Route exact path="/projects" component={ProjectsPageComponent}/>*/}
          {/*<Route path='*' exact={true} component={NotFoundPageComponent}/>*/}
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
