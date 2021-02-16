import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
export default class Articles extends Component {
  state = {
    articles: [],
    isLoading: false,
    value: null,
    query: null,
    sorted: false,
  };

  componentDidMount() {
    this.fetchArticles(this.props.topic);
  }
  componentDidUpdate(pp, ps) {
    const topic = this.props.topic;
    if (pp.topic !== topic) {
      this.fetchArticles(topic);
    }
  }
  render() {
    {
      return this.state.isLoading ? (
        <h1>Page is Loading</h1>
      ) : !this.state.articles.length ? (
        <h1>Topic does not exist!</h1>
      ) : (
        <div className="articles">
          {this.props.topic && !this.state.sorted ? (
            <h1>{this.props.topic} Articles</h1>
          ) : (
            <h1>Articles</h1>
          )}
          <form onSubmit={this.sortArticles}>
            <label for="sort_by">Sort Articles By:</label>
            <select
              value={this.state.value}
              onChange={this.handleInput}
              name="sort_by"
              id="sort_by"
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="created_at">Most Recent</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
            <button>Submit</button>
          </form>

          <button onClick={this.sortOrder}>asc</button>
          <button onClick={this.sortOrder}>desc</button>

          {this.state.articles.map((article) => {
            return (
              <div className="articles1">
                <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                  <span>
                    Date: {new Date(article.created_at).toDateString()}
                  </span>
                  <br />
                  <br />
                  <span> Author: {article.author}</span>
                  <br />
                  <br />
                  <span> Votes: {article.votes}</span>
                </Link>
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  }
  fetchArticles = (topic, sort_by) => {
    this.setState({ isLoading: true });
    return api
      .getArticles(topic, this.state.value, this.state.query)
      .then((articles) => {
        this.setState({ articles, isLoading: false, sorted: false });
      })
      .catch((response) => {});
  };
  sortArticles = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, sorted: true });
    return api
      .getArticles(this.props.topic, this.state.value, this.state.query)
      .then((orderedArticles) => {
        this.setState({
          articles: orderedArticles,
          isLoading: false,
        });
      });
  };
  handleInput = ({ target: { value } }) => {
    this.setState({ value });
  };
  sortOrder = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true, query: e.target.innerText }, () => {
      return api
        .getArticles(this.props.topic, this.state.value, this.state.query)
        .then((orderedArticles) => {
          this.setState({
            articles: orderedArticles,
            isLoading: false,
          });
        });
    });
  };
}
