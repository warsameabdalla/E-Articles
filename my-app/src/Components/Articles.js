import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
export default class Articles extends Component {
  state = {
    articles: [],
    isLoading: false,
    value: undefined,
    query: null,
    sorted: false,
    errMsg:"",
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
        <h2>Page is Loading</h2>
      ) : this.state.errMsg ? (
        <h2>{this.state.errMsg}</h2>
      ) :!this.state.articles.length ? (
        <h2>Topic {this.props.topic}  has no articles or comments</h2>
      ) : (
        <div className="articles">
          {this.props.topic && !this.state.sorted ? (
            <h2>{this.props.topic} Articles</h2>
          ) : (
            <h2>Articles</h2>
          )}
          <button onClick={this.sortOrder}>asc</button>
          <button onClick={this.sortOrder}>desc</button>
          <form onSubmit={this.sortArticles}>
            <label htmlFor="sort_by">Sort Articles By:</label>
            <select
              value={this.state.value}
              onChange={this.handleInput}
              name="sort_by"
              id="sort_by"
            >
            
              <option value="created_at">Most Recent</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
            <button>Submit</button>
          </form>

          {this.state.articles.map((article, index) => {
            return (
              <div key={index} className="articles1">
                <Link to={`/articles/${article.article_id}`}>
                  <h3>{article.title}</h3>
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
      }) 
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
        }) 
    });
  };
}
