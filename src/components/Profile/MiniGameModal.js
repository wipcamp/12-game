import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal'
import profileService from '../../services/profileService';
import lineService from '../../services/LineService';
import Cookies from 'js-cookie';
import MiniGame2 from '../MiniGame2/index';

const StyledNavbar = styled(Navbar)`
    background-color : red;
`

export default class MiniGameModal extends Component {
    state = {
        showModal: false,
        user_energy: this.props.user_data.user_energy,
        game:null
    };

    handleClose = () => {
        //wait for minigame path
        this.setState({ showModal: false });
    }

    handleShow = (game) => {
        this.setState({
             showModal: true ,
             game : game
        });
        this.props.onHide()
    }

    componentWillReceiveProps(nextProps) {
        const { user_energy } = this.props.user_data.user_energy;
        if (nextProps.user_data.user_energy !== user_energy) {
          this.setState({ user_energy: nextProps.user_data.user_energy });
        }
      }

    async getMinigamePage(id,game) {
        const { user_energy, user_max_energy, user_id, cooldown_time } = this.props.user_data
        this.setState({ showModal: false }); 
        if(game=="game1"){
            console.log("play game1")
        }else if(game="game2"){
            console.log("play game 2")
                window.location.replace("/MiniGame2?userId="+this.props.user_data.user_id);
        }
        const verifyMiniGame = await lineService.getGenerateCode()
        Cookies.set('verifyCode',verifyMiniGame.data,{domain:'game.freezer.wip.camp',path: ''})
        let startTime = new Date()
        // window.location.href=`10.5.12.93:3007/?userId=${user_id}&verifyCode=${verifyMiniGame.data}&timeStart=${startTime.getTime()}`
        // window.location.href=`line://app/1653691835-yMpVz5YX/?userId=${user_id}&verifyCode=${verifyMiniGame.data}&timeStart=${startTime.getTime()}`
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
        const { user_energy } = this.state
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide} centered>
                    <Modal.Header closeButton>
                        Choose Minigame
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-link m-2" onClick={()=>this.handleShow("game1")}>
                                <img
                                    src="https://img.icons8.com/cute-clipart/64/000000/controller.png"
                                    width="100"
                                    height="100"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </button>
                            <button className="btn btn-link m-2" onClick={()=>this.handleShow("game2")}>
                                <img
                                    src="https://img.icons8.com/cute-clipart/64/000000/home.png"
                                    width="100"
                                    height="100"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showModal} onHide={this.state.showModal} centered>
                    <Modal.Body>
                        {(user_energy==0||user_energy==null)?"no energy":"Use 1 energy to play "+this.state.game}
                    </Modal.Body>
                    <Modal.Footer>
                        <button 
                            style={{display:(user_energy==0||user_energy==null)?"none":"block"}} 
                            variant="secondary" 
                            onClick={() => this.getMinigamePage(this.props.user_id,this.state.game)}
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


