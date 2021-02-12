import React, { Component } from "react";
import * as api from "../api";

export default class StarUpdater extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            return this.handleClick(1);
          }}
        >
          up
        </button>
        <p> &#9733;</p>
        <button
          onClick={() => {
            return this.handleClick(-1);
          }}
        >
          down
        </button>
      </div>
    );
  }
  handleClick = (starChange) => {
    if (this.props.comment_id) {
      api
        .updateCommentVote(this.props.comment_id, starChange)
        .then(({ comment }) => {
          this.props.updateTheComment(comment);
        });
    } else {
      api.updateStar(this.props.id, starChange).then(({ Article }) => {
        this.props.updateTheArticle(Article);
      });
    }
  };
}
