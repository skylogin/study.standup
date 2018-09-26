import React, { Component } from "react";

import Profile from "./Profile";
import Card from "./Card";

import getEmbedly from "../EmbedlyDao";

import "./Editor.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.getCard = this.getCard.bind(this);
    this.getForcedState = this.getForcedState.bind(this);

    this.state = {
      embedlyUrl: "",
      content: "",
      cardInfo: undefined
    };

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
  }

  render() {
    return (
      <div className="wrapEditor">
        <Profile isAnonymous={this.props.isAnonymous} />

        <div className="textEditor">
          <div
            className="innerEdit"
            contentEditable="true"
            placeholder="글쓰기..."
            onPaste={this.onPaste}
            onKeyUp={this.editorChange}
            // dangerouslySetInnerHTML={{__html: this.state.content}}
            ref={this.setTextInputRef}
          />
        </div>
        <Card cardInfo={this.state.cardInfo} />
        <div className="actionBar">
          <button
            className="upload"
            disabled={!this.hasValue(this.state.content)}
            onClick={this.handleSubmit}
          >
            <span>스탠드업!</span>
          </button>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.getArticle());
    this.setState({
      embedlyUrl: "",
      content: "",
      cardInfo: undefined
    });

    this.textInput.innerHTML = "";
  }

  onPaste(event) {
    event.clipboardData.items[0].getAsString(text => {
      let checkText = this.detectURL(text);
      if (checkText) {
        this.getForcedState(checkText).then(obj => {
          this.setState(obj);
        });
      }
    });
  }

  editorChange(event) {
    let checkText = this.detectURL(event.currentTarget.textContent);
    if (
      !this.state.embedlyUrl &&
      (event.keyCode === 32 || event.keyCode === 13) &&
      checkText
    ) {
      this.getForcedState(checkText, event.currentTarget.textContent).then(
        obj => {
          this.setState(obj);
        }
      );
    } else {
      this.getForcedState(undefined, event.currentTarget.textContent).then(
        obj => {
          this.setState(obj);
        }
      );
    }
  }

  detectURL(text) {
    // var urls = text.match(/(https?:\/\/[^\sA-Za-z0-9]+)/g) || text.match(/(www.[^\s]+)/g);
    let urls =
      text.match(/(http(s)?:\/\/)([A-Za-z0-9\w]+\.*)+[a-z0-9.]{2,10}/g) ||
      text.match(/(www.[A-Za-z0-9\w]+\.*)+[a-z0-9.]{2,10}/g);

    if (urls && urls.length > 0) {
      return urls[0];
    } else {
      return undefined;
    }
  }

  getArticle() {
    let article = {};
    article.user = "Genji";
    article.content = this.state.content;
    if (this.state.embedlyUrl) {
      article.cardInfo = this.state.cardInfo;
    }
    return article;
  }

  hasValue(value) {
    if (value && typeof value === "string") {
      return !value ? false : value.trim() === "" ? false : true;
    } else {
      return false;
    }
  }

  getCard(embedlyUrl) {
    if (embedlyUrl) {
      return <div>{embedlyUrl}</div>;
    } else {
      return <div />;
    }
  }

  getForcedState(embedlyUrl, content) {
    return new Promise(resolve => {
      if (embedlyUrl) {
        getEmbedly(embedlyUrl)
          .then(response => {
            let cardInfo = Object.assign({}, response.data);
            resolve({
              embedlyUrl: embedlyUrl,
              content: content,
              cardInfo: cardInfo
            });
          })
          .catch(error => {
            resolve({
              embedlyUrl: undefined,
              content: undefined,
              cardInfo: undefined
            });
          });
      } else {
        resolve({
          content: content
        });
      }
    });
  }
}

export default Editor;
