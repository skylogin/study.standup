import React, { Component } from "react";

import Editor from "./components/Editor";

import logo from "./images/logo.png";
import "./App.css";

//로고: https://ko.cooltext.com
//파비콘: https://www.favicon-generator.org

class App extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isAnonymous = this.isAnonymous;
  }

  handleSubmit(e) {
    console.log(this, e);
  }

  isAnonymous() {
    return true;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Editor {...this} />
      </div>
    );
  }
}

export default App;
