import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MenuFile from "./Components/Menu.js";
import Add from "./Components/Add";
import "./css/parent.css";
import "./css/bootstrap.css";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/" component={MenuFile} />
            <Route exact path="/MenuFile" component={MenuFile} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
export default App;
