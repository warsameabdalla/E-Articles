import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
export default class Articles extends Component {
  state = {
    articles: [],
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
      return !this.state.articles.length ? (
        <h1>We do not have this page currently working</h1>
      ) : (
        <div className="articles">
          <h1>Articles</h1>
          <label for="sort_by">Sort Articles By:</label>

          <select onChange={this.sortArticles} name="sort_by" id="sort_by">
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
    return api
      .getArticles(topic)
      .then((articles) => {
        this.setState({ articles });
        console.log(articles);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  sortArticles = ({ target: { value } }) => {
    return api.sortingArticles(value).then((orderedArticles) => {
      this.setState({ articles: orderedArticles });
      console.log(this.state);
    });
  };
}
