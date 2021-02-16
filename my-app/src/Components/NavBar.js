import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    topics: [],
    isLoading: false,
  };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    return this.state.isLoading ? (
      <h1>Topics are still Loading</h1>
    ) : (
      <div className="navbar">
        <h1>Click A Topic !</h1>

        {this.state.topics.map((topic) => {
          return (
            <p>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </p>
          );
        })}
      </div>
    );
  }
  fetchTopics = () => {
    this.setState({ isLoading: true });
    return api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };
}
