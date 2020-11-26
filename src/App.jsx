import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/shared/header";
import Home from "./components/Home";
import React from "react";

const App = () => {

  return (

      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <h1>404</h1>
          </Switch>
        </div>
      </Router>

  )
};
export default App;
