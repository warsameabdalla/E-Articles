import React, { Component } from "react";
import * as api from "../api";

export default class StarUpdater extends Component {
  //how do you prevent a user from being able to vote again after you refresh the page
  //the logic doesnt work for the buttons if someone is offline then online
  state = {
    starDifference: 0,
    errMsg: "",
  };
  render() {
    return this.props.user ? (
      <div>
        <button
          disabled={this.state.starDifference === 1}
          onClick={(e) => {
            return this.handleClick(1, e);
          }}
        >
          up
        </button>
        <span> &#9733;</span>
        <button
          disabled={this.state.starDifference === -1}
          onClick={(e) => {
            return this.handleClick(-1, e);
          }}
        >
          down
        </button>
        <p>{this.state.errMsg}</p>
      </div>
    ) : (
      <p> &#9733;</p>
    );
  }
  handleClick = (starChange, e) => {
    this.setState((currentState) => {
      return {
        starDifference: (currentState.starDifference += starChange),
        errMsg: "",
      };
    });
    if (this.props.comment_id) {
      let updatedComment = {...this.props.comment};
      console.log(updatedComment);
      updatedComment.votes += starChange;
      this.props.updateTheComment(updatedComment, this.props.index);
      api
        .updateCommentVote(this.props.comment_id, starChange)
        .then((err) => {})
        .catch((err) => {
          this.setState((currentState) => {
            return { errMsg: "like request failed refresh the page" };
          });
        });
    } else {
      let updatedArticle = {...this.props.article};
      updatedArticle.votes += starChange;
      this.props.updateTheArticle(updatedArticle);
      api
        .updateStar(this.props.id, starChange)
        .then((err) => {})
        .catch((err) => {});
    }
  };
}
