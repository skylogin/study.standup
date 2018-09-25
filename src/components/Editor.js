import React, { Component } from "react";
import "./Editor.css";
import Profile from "./Profile";

class Editor extends Component {
  constructor(props) {
    super(props);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.detectURL = this.detectURL.bind(this);
    this.hasValue = this.hasValue.bind(this);
    this.getCard = this.getCard.bind(this);

    this.state = {
      embedlyUrl: undefined,
      content: undefined
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
          />
        </div>
        <div className="actionBar">
          <button className="upload" onClick={this.props.handleSubmit}>
            <span>스탠드업!</span>
          </button>
        </div>
      </div>
    );
  }

  onPaste(event) {
    event.clipboardData.items[0].getAsString(text => {
      if (this.detectURL(text)) {
        this.setState({ embedlyUrl: text, content: this.state.content });
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
      this.setState({
        embedlyUrl: checkText,
        content: event.currentTarget.textContent
      });
    } else {
      this.setState({ content: event.currentTarget.textContent });
    }
  }

  detectURL(text) {
    //const urls = text.match(/(https?:\/\/[^\sA-Za-z0-9]+)/g) || text.match(/(www.[^\s]+)/g);
    const urls =
      text.match(/(http(s)?:\/\/)([A-Za-z0-9\w]+\.*)+[a-z0-9.]{2,10}/g) ||
      text.match(/(www.[A-Za-z0-9\w]+\.*)+[a-z0-9.]{2,10}/g);
    if (urls.length > 0) {
      return urls[0];
    } else {
      return undefined;
    }
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
}

export default Editor;
