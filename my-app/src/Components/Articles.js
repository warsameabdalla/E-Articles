import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
export default class Articles extends Component {
  state = {
    articles: [],
    isLoading: false,
  };

  componentDidMount() {
    console.log("mounting");
    this.fetchArticles(this.props.topic);
  }
  componentDidUpdate(pp, ps) {
    const topic = this.props.topic;
    console.log(pp.topic, topic);
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
          <h1>Articles</h1>
          <label for="sort_by">Sort Articles By:</label>
          <select onChange={this.sortArticles} name="sort_by" id="sort_by">
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="created_at">Most Recent</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>
          {this.state.articles.map((article) => {
            return (
              <div className="articles1">
                <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
                <br />
              </div>
            );
          })}
        </div>
      );
    }
  }
  fetchArticles = (topic) => {
    this.setState({ isLoading: true });
    return api
      .getArticles(topic)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
        console.log(articles);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  sortArticles = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    return api.sortingArticles(e.target.value).then((orderedArticles) => {
      this.setState({ articles: orderedArticles, isLoading: false });
      console.log(this.state);
    });
  };
}
