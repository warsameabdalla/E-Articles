import React, { Component } from "react";
// how do i clear the input affter i post?
export default class Addcomment extends Component {
  state = {
    commentInput: "",
    bool: true,
  };
  render() {
    return (
      <div className="addcomment">
        <form onSubmit={this.handleSubmit}>
          <label for="body">Add a comment</label>
          <input
            onChange={this.handleInput}
            type="text"
            id="body"
            placeholder="write a comment . . ."
          />
          <button onClick={this.submitting} action="submit">
            Add comment
          </button>
          {!this.state.bool && <p>Make sure you write in the input box ! !</p>}
        </form>
      </div>
    );
  }
  handleInput = ({ target: { value } }) => {
    this.setState({ commentInput: value });
    return this.state.commentInput && this.setState({ bool: true });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.bool == true) {
      // const { commentInput } = this.state;
      const postComment = {
        author: this.props.user,
        body: this.state.commentInput,
        article_id: this.props.id,
      };
      this.setState({ commentInput: "" });
      console.log(this.state);
      this.props.addNewComment(postComment);
    }
  };
  submitting = (event) => {
    return !this.state.commentInput && this.setState({ bool: false });
  };
}
