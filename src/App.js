import React, { Component } from "react";
import FirebaseDao from "./FirebaseDao";

import Editor from "./components/Editor";

import config from "./config";
import logo from "./images/logo.png";
import "./App.css";

//로고: https://ko.cooltext.com
//파비콘: https://www.favicon-generator.org

class App extends Component {
  constructor() {
    super();

    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);

    this.state = {
      articles: []
    };
    this.isAnonymous = this.isAnonymous;
  }

  submit(article) {
    if (article) {
      let key = this.dao.newKey();
      let updated = this.dao.update(key, article);
      return updated;
    }
  }

  isAnonymous() {
    return true;
  }

  getArticles() {
    let list = [];
    for (let i = 0; i < this.state.articles.length; i++) {
      list.push(
        <li key={this.state.articles[i].key}>
          {this.state.articles[i].content}
        </li>
      );
    }
    return list;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Editor submit={this.submit} isAnonymous={this.isAnonymous} />
        <ul>{this.getArticles()}</ul>
      </div>
    );
  }

  componentWillMount() {
    this.dao.list(25).on("value", dataSnapshots => {
      let items = [];
      dataSnapshots.forEach(dataSnapshot => {
        let item = dataSnapshot.val();
        item["key"] = dataSnapshot.key;
        items.push(item);
      });

      if (items && items.length > 0) {
        this.setState({
          articles: items.reverse()
        });
      }
    });
  }

  componentWillUnmount() {
    this.dao.off();
  }
}

export default App;
