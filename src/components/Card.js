import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    let cardInfo = this.props.cardInfo;
    if (cardInfo) {
      return (
        <a className="card" href={cardInfo.url} target="_blank">
          <div className="card_image">
            <img
              src={cardInfo.thumbnail_url}
              alt={cardInfo.title}
              className="width100 card_img"
            />
          </div>
          <div className="borderTop">
            <div className="card_text">
              <p className="card_title">{cardInfo.title}</p>
              <p className="card_desc">{cardInfo.description}</p>
              <p className="card_provider">{cardInfo.provider_name}</p>
            </div>
          </div>
        </a>
      );
    } else {
      return null;
    }
  }
}

export default Card;
