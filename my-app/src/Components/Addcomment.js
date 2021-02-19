import React, { Component } from "react";
// how do i clear the input affter i post?
export default class Addcomment extends Component {
  state = {
    commentInput: "",
    input: true,
  };
  render() {
    return (
      <div className="addcomment">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="body">Add a comment</label>
          <input
            onChange={this.handleInput}
            type="text"
            id="body"
            placeholder="write a comment . . ."
            value={this.state.commentInput}
          />
          <button onClick={this.submitting} disabled={!this.props.user}action="submit">
            Add comment
          </button>
          {!this.props.user && this.state.commentInput ? (
            <p>Please log in to add a comment</p>
          ) : null}
         
        </form>
      </div>
    );
  }
  handleInput = ({ target: { value } }) => {
    this.setState({ commentInput: value });
    return this.state.commentInput && this.setState({ input: true });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.input == true) {
      // const { commentInput } = this.state;
      const postComment = {
        author: this.props.user,
        body: this.state.commentInput,
        article_id: this.props.id,
      };
      this.setState({ commentInput: "" });
      this.props.addNewComment(postComment);
    }
  };
  submitting = (event) => {
    return !this.state.commentInput && this.setState({ input: false });
  };
}
