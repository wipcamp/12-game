import React, { Component } from "react";
import { Progress } from "reactstrap";
import styled from 'styled-components'

// const ProgressBar = styled(Progress)`
//     height: 2px; 
//     paddingVertical: 20;
//   `

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
    return (
      <div className="row d-flex">
        <div className="col-sm-3">
          {this.state.status} : {this.state.level}
        </div>
        <div className="col-sm-12">
          <Progress style={{ flex: 1, marginRight: 12, height: 2, paddingVertical: 20 }}  value={this.state.percent} color={this.state.color} />
        </div>
      </div>
    );
  }
}
