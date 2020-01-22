import React, { Component } from "react";
import { Progress } from "reactstrap";
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import profileService from '../../services/profileService';

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
    user_id:null,
    status: this.props.status,
    percent: this.props.percent,
    color: this.props.color,
    level: this.props.level,
    showModal: false,
    isLevelUp: false
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
    if (this.props.isLevelUp != null) {
      const { isLevelUp } = this.props.isLevelUp;
      if (nextProps.isLevelUp !== isLevelUp) {
        this.setState({ isLevelUp: nextProps.isLevelUp });
      }
    }
    if (this.props.user_id != null) {
      const { user_id } = this.props.user_id;
      if (nextProps.user_id !== user_id) {
        this.setState({ user_id: nextProps.user_id });
      }
    }
  }

  getUpdateButton() {
    if (this.state.isLevelUp === true) {
      return (
        <div>
          <button onClick={this.handleShow}>+</button>
        </div>
      )
    } else {
      return null;
    }
  }

  handleClose = () => {
    //wait for minigame path
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  async updateStatus(user_id,status,quantity){
    await profileService.updateStatus(user_id,status,quantity); 
    this.setState({ showModal: false });
    this.props.getNewStatus();
  }

  render() {
    return (
      <div className="d-flex">
        <Status>
          {this.state.status} : {this.state.level}
        </Status>
        <div >
          <Progress
            style={this.props.style == null ? { marginTop: 10, height: 5, paddingVertical: 20, width: '50vw' } : this.props.style}
            value={this.state.percent}
            color={this.state.color}
          />
        </div>
        {this.props.isLevelUp == null ? null : this.getUpdateButton()}
        <Modal show={this.state.showModal} onHide={this.handleClose} centered>
          <Modal.Body>
            {"Do you want to upgrade your " + (this.state.status=="str"?"strength":(this.state.status=="dex"?"dexxx":(this.state.status=="luk"?"lukky":null))) + " using 1 point?"}
          </Modal.Body>
          <Modal.Footer>
            <button
              variant="secondary"
              onClick={()=>this.updateStatus(this.state.user_id,this.state.status,1)}
            >
              yes
            </button>
            <button variant="primary" onClick={this.handleClose}>
              no
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
