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
    user_test_data: {},
    sample_id: 1,
    percentExp: 0,
    user_level: 0,
    user_str: 0,
    user_dex: 0,
    user_luk: 0,
    user_energy: 0
  };

  componentDidMount() {
    this.getProfileData(this.state.sample_id);
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
    this.setState({
      user_test_data: data.data,
      percentExp: (data.data.exp * data.data.maxExp) / 100,
      user_level: data.data.level,
      user_str: data.data.str,
      user_dex: data.data.dex,
      user_luk: data.data.luk,
      user_energy: data.data.energy
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
                percent={(this.state.user_test_data.energy / this.state.user_test_data.maxEnergy) * 100}
                level={this.state.user_energy}
                status='energy'
              />
            </EnergyProgressbar>
            user_name: {this.state.user_test_data.name} <br />
            <Progressbar
              color='warning'
              percent={this.state.percentExp}
              level={this.state.user_level}
              status='Level'
            />
            {/*
            <p onClick={this.getProfile.bind(this)} >Get user</p>
            <p onClick={this.getProfileData.bind(this)} >Get DATA</p>
            */}
            team: {this.state.user_test_data.team} <br />
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
