import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

export default class NavBar extends Component {
  state = {
    topics: [],
    isLoading: true,
    errMsg: ""
  };
  componentDidMount() {
    this.fetchTopics();
  }
  render() {
    return this.state.isLoading ? (
      <h2>Topics are still Loading</h2>
    ) : (this.state.errMsg ? (
      <h2>Request failed</h2>
    ) :
      <div className="navbar">
        <h2>Click A Topic !</h2>

        {this.state.topics.map((topic, index) => {
          return (
            <p key={index}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </p>
          );
        })}
      </div>
    );
  }
  fetchTopics = () => {
    // this.setState({ isLoading: true });
    return api.getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    }).catch(({ response: { data } }) => {
      this.setState({ errMsg: data.msg, isLoading: false });
    });
  };
}
