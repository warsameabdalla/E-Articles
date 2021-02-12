import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    topics: [],
  };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    return (
      <div className="navbar">
        <h1>Click A Topic !</h1>

        {this.state.topics.map((topic) => {
          console.log(topic);
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
    return api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  };
}
