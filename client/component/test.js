import React, {Component} from "react";
import {Router, Route, Link, browserHistory, hashHistory, IndexRoute} from "react-router";


class Test extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div>
        this.props.title is {this.props.title}<br/>
        this.props.params.id is {this.props.params.id}
        <h1>in test</h1>
        <button onClick={this.props.changetitle}>자라나라버튼버튼</button>
      </div>
    )

  }
}

export default Test;
