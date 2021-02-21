import React, { Component } from "react";
import { Link } from "@reach/router";
export default class Title extends Component {
  render() {
    return (
      <div>
        <Link to={`/`}>
          <h2>E-Articles</h2>
        </Link>
      </div>
    );
  }
}
