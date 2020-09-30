import * as React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
import "./app.scss";

const ComponentOne = loadable(() => import("./views/One"));
const ComponentTwo = loadable(() => import("./views/Two"));
const ComponentThree = loadable(() => import("./views/Three"));

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="page-container">
          <Router>
            <ul>
              <li>
                <Link to="/one">one</Link>
              </li>
              <li>
                <Link to="/two">two</Link>
              </li>
              <li>
                <Link to="/three">three</Link>
              </li>
            </ul>
            <div className="page-content">
              <Route exact path="/one" component={ComponentOne}></Route>
              <Route exact path="/two" component={ComponentTwo}></Route>
              <Route exact path="/three" component={ComponentThree}></Route>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
