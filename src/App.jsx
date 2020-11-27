import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/shared/header";
import Home from "./components/Home";
import React from "react";
import Product from "./components/Product";


const App = () => {

  return (
      <Router>
        <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <h1>404</h1>
          </Switch>
      </Router>
  )
};
export default App;
