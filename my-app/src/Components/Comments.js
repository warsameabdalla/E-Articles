import React, { Component } from "react";
import * as api from "../api";
import Addcomment from "./Addcomment";
import StarUpdater from "./StarUpdater";

export default class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    console.log("mounting");
    this.fetchArticleComments(this.props.id);
  }
  componentDidUpdate(pp, ps) {
    const id = this.props.id;
    if (pp.id !== id) {
      this.fetchArticleComments(id);
    }
  }
  render() {
    return (
      <div>
        <Addcomment
          addNewComment={this.addNewComment}
          id={this.props.id}
          user={this.props.user}
        />
        <h3>{this.props.comment_count} comments</h3>
        {this.state.comments.map((comment) => {
          return (
            <div className="comment">
              <ul>
                <li>
                  <p>{comment.body}</p>
                  <p>
                    Time posted: {new Date(comment.created_at).toDateString()}
                  </p>
                  <p>Votes: {comment.votes}</p>
                  <StarUpdater
                    comment_id={comment.comment_id}
                    votes={comment.votes}
                    updateTheComment={this.updateTheComment}
                  />
                  <p>author: {comment.author}</p>
                  {comment.author === this.props.user && (
                    <button
                      onClick={() => {
                        this.deleteComment(comment.comment_id);
                      }}
                    >
                      Delete
                    </button>
                  )}
                </li>
                <br />
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
  fetchArticleComments = (id) => {
    api
      .getArticleComments(id)
      .then(({ comments }) => {
        this.setState({ comments });
        console.log(this.state);
      })
      .catch(({ response: { data } }) => {
        console.log(data);
        this.setState({ comments: data.msg });
      });
  };
  addNewComment = (input) => {
    api.addCommentById(input).then(({ Article }) => {
      this.setState((currentState) => {
        return { comments: [...Article, ...currentState.comments] };
      });
    });
  };
  deleteComment = (id) => {
    api.deleteCommentById(id).then((deletedComment) => {
      this.setState((currentState) => {
        const updatedComments = currentState.comments.filter((comment) => {
          return comment.comment_id !== id;
        });
        return { comments: updatedComments };
      });
    });
  };
  updateTheComment = (id) => {
    this.setState({ comments: [id] });
  };
}
