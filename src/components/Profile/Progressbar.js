import React, { Component } from "react";
import { Progress } from "reactstrap";
import styled from 'styled-components'

// const ProgressBar = styled(Progress)`
//     height: 2px; 
//     paddingVertical: 20;
//   `

const Status = styled.div`
  width : 60px;
  overflow : hidden;
  margin-right : 10px;
  height : 30px;
`

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
      <div className="d-flex">
        <Status>
          {this.state.status} : {this.state.level}
        </Status>
        <div >
          <Progress style={this.props.style==null?{marginTop:10, height: 5, paddingVertical: 20 , width:'50vw'}:this.props.style}  value={this.state.percent} color={this.state.color} />
        </div>
      </div>
    );
  }
}
