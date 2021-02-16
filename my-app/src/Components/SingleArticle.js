import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import StarUpdater from "./StarUpdater";

export default class SingleArticle extends Component {
  state = {
    singleArticle: [],
    errMsg: "",
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchArticle(this.props.article_id);
  }
  componentDidUpdate(pp, ps) {
    const id = this.props.article_id;
    if (pp.article_id !== id) {
      this.fetchArticle(id);
    }
  }
  render() {
    return this.state.isLoading ? (
      <h1>Article is still Loading</h1>
    ) : this.state.errMsg ? (
      <p>{this.state.errMsg}</p>
    ) : (
      <div className="singleArticleContainer">
        <div className="singlearticle">
          <p>Topic: {this.state.singleArticle.topic}</p>
          <h1>{this.state.singleArticle.title}</h1>
          <p>{this.state.singleArticle.body}</p>
          <h4>Author:{this.state.singleArticle.author}</h4>
          <h4>Votes: {this.state.singleArticle.votes}</h4>
          <StarUpdater
            user={this.props.user}
            id={this.state.singleArticle.article_id}
            star={this.state.singleArticle.votes}
            article={this.state.singleArticle}
            updateTheArticle={this.updateTheArticle}
          />
          {this.props.article_id && (
            <Comments
              user={this.props.user}
              id={this.props.article_id}
              comment_count={this.state.singleArticle.comment_count}
            />
          )}
        </div>
      </div>
    );
  }
  fetchArticle = (id) => {
    return api
      .getArticle(id)
      .then((singleArticle) => {
        this.setState({ singleArticle, isLoading: false });
      })
      .catch(({ response: { data } }) => {
        this.setState({ errMsg: data.msg, isLoading: false });
        console.log(data.msg);
      });
  };
  updateTheArticle = (id) => {
    this.setState({ singleArticle: id });
  };
}
