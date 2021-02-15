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
          onClick={() => {
            return this.handleClick(1);
          }}
        >
          up
        </button>
        <span> &#9733;</span>
        <button
          disabled={this.state.starDifference === -1}
          onClick={() => {
            return this.handleClick(-1);
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
  handleClick = (starChange) => {
    if (this.props.comment_id) {
      this.setState((currentState) => {
        return {
          starDifference: (currentState.starDifference += starChange),
          errMsg: "",
        };
      });
      let a = this.props.comment;
      console.log(a);
      a.votes += starChange;
      this.props.updateTheComment(a, this.props.index);
      api
        .updateCommentVote(this.props.comment_id, starChange)
        .then((err) => {
          console.log("hey");
        })
        .catch((err) => {
          console.log("hahah");
          this.setState((currentState) => {
            return { errMsg: "like request failed refresh the page" };
          });
        });
    } else {
      this.setState((currentState) => {
        return {
          starDifference: (currentState.starDifference += starChange),
        };
      });
      let b = this.props.article;
      b.votes += starChange;
      this.props.updateTheArticle(b);
      api
        .updateStar(this.props.id, starChange)
        .then((err) => {
          console.log("hey");
        })
        .catch((err) => {
          console.log("hello");
        });
    }
  };
}
