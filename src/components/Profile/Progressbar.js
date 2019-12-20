import React, { Component } from "react";
import { Progress } from "reactstrap";

export default class Progressbar extends Component {
  state = {
    status: this.props.status,
    percent: this.props.percent,
    color: this.props.color,
    level: this.props.level
  };

  componentWillReceiveProps(nextProps) {
    const { level } = this.props.level;
    const { percent } = this.props.percent;
    if (nextProps.percent !== percent) {
      this.setState({ percent: nextProps.percent });
    }
    if (nextProps.level !== level) {
      this.setState({ level: nextProps.level });
    }
  }

  render() {
    console.log(this.state.percent);
    console.log(this.state.level);
    return (
      <div className="row d-flex">
        <div className="col-sm-3">
          {this.state.status} : {this.state.level}
        </div>
        <div className="col-sm-12">
          <Progress value={this.state.percent} color={this.state.color} />
        </div>
      </div>
    );
  }
}
