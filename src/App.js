import React from "react";
import Home from "./components/Home/Home";
import "./css/App.css";

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <span className="app-header">Budget Tracker</span>
        <Home />
      </div>
    );
  }
}

export default App;