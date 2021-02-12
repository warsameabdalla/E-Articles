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
    user: "tickle122",
  };
  render() {
    return (
      <div className="App">
        <Title />
        <img
          className="img1"
          src="https://www.puma-catchup.com/wp-content/uploads/2019/04/H1-Football.jpg"
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
}
