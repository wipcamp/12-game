import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Progressbar from './Progressbar';
import Character from './Character';
import styled from 'styled-components';
import SideNavbar from './SideNavbar';

const CenterComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70vw;
  transform: translate(-50%, -50%);
  ${props => props.energy && `
  top: 30qq%;
  left: 50%;
  `}
`;

const EnergyProgressbar = styled(CenterComponent)`
position: adsolute;
top: -15%;
left: 85vw;
`

const liff = window.liff;
export default class Profile extends Component {
  state = {
    user_id: 1,
    user_level: 0,
    user_str: 0,
    user_dex: 0,
    user_luk: 0,
    user_energy: 0,
    user_max_energy: 0,
    user_name: "",
    user_team_name: "",
    user_exp: 0,
    user_max_exp: 0
  };

  componentDidMount() {
    this.getProfileData(this.state.user_id);
    // liff
    //   .init({
    //     liffId: '1653691835-vZ4GNK7z'
    //   })
    //   .then(async () => {
    //     if (!liff.isLoggedIn()) {
    //       liff.login();
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // this.getProfileData(this.getProfile());
  }

  getProfile() {
    liff.getProfile().then(dataInfo => {
      this.setState({
        user_id: dataInfo.userId
      })
    });
  }

  async getProfileData(id) {
    console.log(id)
    let data = await profileService.getProfile(id);
    console.log(data)
    let userGame = data.data
    this.setState({
      user_level: userGame.level,
      user_str: userGame.str,
      user_dex: userGame.dex,
      user_luk: userGame.luk,
      user_energy: userGame.energy,
      user_max_energy: userGame.maxEnergy,
      user_name: userGame.name,
      user_team_name: userGame.team.teamName,
      user_exp: userGame.exp,
      user_max_exp: userGame.maxExp
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <CenterComponent>
            <EnergyProgressbar>
              <Progressbar
                energy
                style={{ height: 10, width: 50, marginTop: 10 }}
                color='warning'
                percent={(this.state.user_energy / this.state.user_max_energy) * 100}
                level={this.state.user_energy}
                status='energy'
              />
            </EnergyProgressbar>
            user_name: {this.state.user_name} <br />
            <Progressbar
              color='warning'
              percent={this.state.user_exp}
              level={this.state.user_level}
              status='Level'
            />
            {/*
            <p onClick={this.getProfile.bind(this)} >Get user</p>
            <p onClick={this.getProfileData.bind(this)} >Get DATA</p>
            */}
            team: {this.state.user_team_name} <br />
            <Character level={this.state.user_level} />{' '}
            <Progressbar
              color='warning'
              percent={this.state.user_str}
              level={this.state.user_str}
              status='str'
            />
            <Progressbar
              color='warning'
              percent={this.state.user_dex}
              level={this.state.user_dex}
              status='dex'
            />
            <Progressbar
              color='warning'
              percent={this.state.user_luk * 10}
              level={this.state.user_luk}
              status='luk'
            />
          </CenterComponent>{' '}
        </div>
      </div>
    );
  }
}
