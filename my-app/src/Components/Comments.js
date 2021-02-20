import React, { Component } from "react";
import * as api from "../api";
import Addcomment from "./Addcomment";
import StarUpdater from "./StarUpdater";

export default class Comments extends Component {
  state = {
    comments: [],
    isLoading: false,
    hideDelete: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchArticleComments(this.props.id);
  }
  componentDidUpdate(pp, ps) {
    const id = this.props.id;
    if (pp.id !== id) {
      this.fetchArticleComments(id);
    }
  }
  render() {
    return this.state.isLoading ? (
      <h2>Comments are still Loading</h2>
    ) : ( this.state.errMsg?<h2>Your request has failed</h2>:
      <div>
        <Addcomment
          addNewComment={this.addNewComment}
          id={this.props.id}
          user={this.props.user}
        />
        <h3>{this.props.comment_count} comments</h3>
        {this.state.comments.map((comment, index) => {
          return (
            <div key={index} className="comment">
              <ul>
                <li className="li">
                  <p>{comment.body}</p>
                  <p>
                    Time posted: {new Date(comment.created_at).toDateString()}
                  </p>
                  <p>Votes: {comment.votes}</p>
                  <StarUpdater
                    user={this.props.user}
                    comment_id={comment.comment_id}
                    votes={comment.votes}
                    comment={comment}
                    updateTheComment={this.updateTheComment}
                    index={index}
                  />
                  <p>author: {comment.author}</p>
                  {comment.author === this.props.user &&
                  !this.state.hideDelete ? (
                    <button
                      onClick={() => {
                        this.deleteComment(comment.comment_id);
                      }}
                    >
                      Delete
                    </button>
                  ) : null}
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
        this.setState({ comments, isLoading: false });
      })
      .catch(({ response: { data } }) => {
        this.setState({ errMsg: data.msg, isLoading: false });
      });
  };
  addNewComment = (input) => {
    api.addCommentById(input).then(({ comment }) => {
      this.setState((currentState) => {
        return { comments: [...comment, ...currentState.comments] };
      });
    });
  };

  deleteComment = (id) => {
    this.setState({ hideDelete: true });
    api.deleteCommentById(id).then((deletedComment) => {
      this.setState((currentState) => {
        const updatedComments = currentState.comments.filter((comment) => {
          return comment.comment_id !== id;
        });
        return { comments: updatedComments, hideDelete: false };
      });
    }).catch(({ response: { data } }) => {
      this.setState({ errMsg: data.msg, isLoading: false });
    });
  };
  updateTheComment = (updatedComment, index) => {
    this.setState((currentState) => {
      let updatedComments = [...currentState.comments]
      updatedComments[index] = updatedComment;
      return {
        comments: updatedComments,
      };
    });
  };
}
