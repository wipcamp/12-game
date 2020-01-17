import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal'
import profileService from '../../services/profileService';
import lineService from '../../services/LineService';
import Cookies from 'js-cookie';

const StyledNavbar = styled(Navbar)`
    background-color : red;
`

export default class Menubar extends Component {
    state = {
        showModal: false,
        user_energy: this.props.user_data.user_energy
    };

    handleClose = () => {
        //wait for minigame path
        this.setState({ showModal: false });
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    componentWillReceiveProps(nextProps) {
        const { user_energy } = this.props.user_data.user_energy;
        if (nextProps.user_data.user_energy !== user_energy) {
          this.setState({ user_energy: nextProps.user_data.user_energy });
        }
      }

    async getMinigamePage(id) {
        const { user_energy, user_max_energy, user_id, cooldown_time } = this.props.user_data
        // console.log("cooldown" + cooldown_time)
        // await profileService.useEnergy(id);       
        // if (user_energy == user_max_energy) {
        //     let date = new Date();
        //     date.setHours(date.getHours() + 1);
        //     console.log("current date" + new Date())
        //     console.log("setCooldownFirstTime" + date)
        //     this.props.setCooldownTime();
        //     console.log("remain in menu max")
        // }
        this.setState({ showModal: false }); 
        const verifyMiniGame = await lineService.getGenerateCode()
        Cookies.set('verifyCode',verifyMiniGame.data,{domain:'game.freezer.wip.camp',path: ''})
        let startTime = new Date()
        // window.location.href=`http://10.5.4.175:3007/?userId=${user_id}&verifyCode=${verifyMiniGame.data}&timeStart=${startTime.getTime()}`
        window.location.href=`line://app/1653691835-yMpVz5YX`
        // this.props.newEnergy(); 
        //window.location.replace("http://localhost:3001/login");
    }

    getScoreBoardPage() {
        window.location.replace("")
    }

    getHistoryPage() {
        window.location.replace("")
    }

    render() {
        console.log("user energy"+this.state.user_energy)
        const { user_energy } = this.state
        return (
            <div>
                <StyledNavbar fixed="bottom" className="justify-content-center">
                    <div className="d-flex">
                        <button className="btn btn-link" onClick={function () { console.log("click") }}>
                            <img
                                src="https://img.icons8.com/cute-clipart/64/000000/home.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </button>
                        <button className="btn btn-link" onClick={this.handleShow}>
                            <img
                                src="https://img.icons8.com/cute-clipart/64/000000/controller.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </button>
                        <button className="btn btn-link" onClick={this.getScoreBoardPage}>
                            <img
                                src="https://img.icons8.com/cute-clipart/64/000000/map.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </button>
                        <button className="btn btn-link" onClick={this.getHistoryPage}>
                            <img
                                src="https://img.icons8.com/color/48/000000/activity-history.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                        </button>
                    </div>
                </StyledNavbar>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                    <Modal.Body>
                        {(user_energy==0||user_energy==null)?"no energy":"Use 1 energy to play minigame"}
                    </Modal.Body>
                    <Modal.Footer>
                        <button 
                            style={{display:(user_energy==0||user_energy==null)?"none":"block"}} 
                            variant="secondary" 
                            onClick={() => this.getMinigamePage(this.props.user_id)}
                        >
                            play
                        </button>
                        <button variant="primary" onClick={this.handleClose}>
                            cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


