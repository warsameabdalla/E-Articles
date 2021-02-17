import React, { Component } from "react";
import { Link } from "@reach/router";
export default class Title extends Component {
  render() {
    return (
      <div>
        <Link to={`/`}>
          <h1>E-Articles</h1>
        </Link>
      </div>
    );
  }
}
