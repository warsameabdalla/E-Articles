import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Articles from "./Components/Articles";
import NavBar from "./Components/NavBar";
import SingleArticle from "./Components/SingleArticle";
import Title from "./Components/Title";
import User from "./Components/User";
import NotFound from "./Components/NotFound";

export default class App extends Component {
  state = {
    user: "",
    loggedin: false,
  };
  render() {
    return (
      <div className="App">
        <div className="title">
          <div className="login">
            {!this.state.loggedin ? (
              <button onClick={this.login}>log in</button>
            ) : (
              <div>
                <span>user: {this.state.user}</span>
                <button onClick={this.login}>logout</button>
              </div>
            )}
          </div>
          <Title />
        </div>
        <img
          className="img1"
          src="https://www.jonesday.com/-/media/files/publications/2019/05/when-coding-is-criminal/when-coding-is-criminal.jpg"
          alt="football article"
          height="400px"
          width="300px"
        />
        <NavBar />
        <Router>
          <User path="/user/:username" />
          <Articles path="/" />
          <Articles path="/articles" />
          <Articles path="/topics/:topic" />
          <SingleArticle user={this.state.user} path="/articles/:article_id" />
          <NotFound default />
        </Router>
      </div>
    );
  }
  login = (e) => {
    if (this.state.loggedin) {
      this.setState((currentState) => {
        return { loggedin: !currentState.loggedin, user: "" };
      });
    } else {
      this.setState((currentState) => {
        return { loggedin: !currentState.loggedin, user: "tickle122" };
      });
    }
  };
}
