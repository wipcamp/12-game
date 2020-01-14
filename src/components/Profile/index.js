import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Progressbar from './Progressbar';
import Character from './Character';
import styled from 'styled-components';
import Menubar from './Menubar';
import Countdown from './Countdown'


const loginGameUrl = 'https://game.freezer.wip.camp/login'
const CenterComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 70vw;
  transform: translate(-50%, -50%);
`;

const EnergyProgressbar = styled(CenterComponent)`
position: adsolute;
top: -15%;
left: 85vw;
`


export default class Profile extends Component {

  state = {
    user_id: this.props.profileData.user_id,
    user_level: this.props.profileData.user_level,
    user_str: this.props.profileData.user_str,
    user_dex: this.props.profileData.user_dex,
    user_luk: this.props.profileData.user_luk,
    user_energy: this.props.profileData.user_energy,
    user_max_energy: this.props.profileData.user_max_energy,
    user_name: this.props.profileData.user_name,
    user_team_name: this.props.profileData.user_team,
    user_exp: this.props.profileData.user_exp,
    user_max_exp: this.props.profileData.user_max_exp,
    cooldown_time: this.props.profileData.cooldown_time
  };

  componentDidMount(){
    if (this.state.user_max_energy > this.state.user_energy) {
      //let date = new Date();
      this.getRemainingTime(this.state.cooldown_time)
    } else {
      console.log("energy is full")
    }
  }

  async addEnergy(energyAdd) {
    const { user_energy, user_max_energy, cooldown_time, user_id } = this.state
    if (this.state.user_max_energy > (this.state.user_energy + energyAdd)) {
      console.log("addEnergy" + energyAdd);
      let totalEnergy = user_energy + energyAdd;
      await profileService.setEnergy(user_id, totalEnergy)
      this.setCooldownTime(user_id);
      this.getNewEnergy(user_id)
      let data = await profileService.getCooldownTime(user_id);
      let cooldownTime = data.data;
      this.setState({
        cooldown_time: cooldownTime
      })
    } else if (this.state.user_max_energy == this.state.user_energy + energyAdd) {
      console.log("equals")
      let totalEnergy = user_energy + energyAdd;
      profileService.setEnergy(user_id, totalEnergy)
      this.getNewEnergy(user_id)
      this.setState({
        cooldown_time: null
      })
    }
    else {
      console.log("add full energy" + (this.state.user_max_energy - this.state.user_energy))
      let totalEnergy = user_max_energy;
      profileService.setEnergy(user_id, totalEnergy)
      this.getNewEnergy(user_id)
      this.setState({
        cooldown_time: null
      })
    }
  }


  getRemainingTime(cooldown) {
    let cooldown_time = new Date(cooldown);
    let current_time = new Date();
    console.log("cool" + cooldown_time)
    if (cooldown_time >= current_time) {
      let remaining = Math.abs(cooldown_time - current_time);
      let min = Math.floor(remaining / 60000);
      let sec = ((remaining % 60000) / 1000).toFixed(0);
      let time = { min, sec }
      console.log("ยังไม่ถึงเวลา")
      console.log("remaining" + remaining)
      console.log("toTime" + min + ":" + (sec < 10 ? '0' : '') + sec)
      console.log(time)
      this.setState({
        time: time
      })
    } else {
      let remaining = Math.abs(current_time - cooldown_time);
      let pre_min = Math.floor(remaining / 60000);
      let pre_sec = ((remaining % 60000) / 1000).toFixed(0);
      let energy_add = Math.floor(pre_min / 60);
      let min = 60 - (pre_min % 60);
      let sec = 60 - (pre_sec);
      let time = { min, sec, energy_add }
      console.log("เกินเวลาแร้วแม่")
      console.log("remaining" + remaining)
      console.log("toTime" + min + ":" + (sec < 10 ? '0' : '') + sec)
      console.log(time)
      this.setState({
        time: time
      })
      this.addEnergy(energy_add)
    }
  }

  async getNewEnergy(id) {
    let data = await profileService.getProfile(id);
    console.log("get new")
    this.setState({
      user_energy: data.data.energy,
    })
    this.getRemainingTime(this.state.cooldown_time)
  }
  async getNewEnergy(id) {
    let data = await profileService.getProfile(id);
    console.log("get new")
    this.setState({
      user_energy: data.data.energy,
    })
    this.getRemainingTime(this.state.cooldown_time)
  }
  
  async setCooldownTime(id) {
    await profileService.setCooldownTime(id);
    let data = await profileService.getCooldownTime(id);
    let cooldownTime = data.data;
    this.setState({
      cooldown_time: cooldownTime
    })
    console.log(cooldownTime)

    this.getRemainingTime(this.state.cooldown_time);
    console.log("setting complete")
    console.log("new cooldown" + this.state.cooldown_time)
  }

  render() {
    console.log(this.state.cooldown_time)
    console.log("time" + this.state.time)
    return (
      <div>
        <div className="container">
          <CenterComponent>
            <Countdown
              minute={this.state.cooldown_time == null || this.state.time == null ? 999 : this.state.time.min}
              second={this.state.cooldown_time == null || this.state.time == null ? 999 : this.state.time.sec}
              onTimeOut={() => this.addEnergy(1)}
            />
            <EnergyProgressbar>
              <Progressbar
                style={{ height: 10, width: 50, marginTop: '17%' }}
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
            <Character level={this.state.user_level} userExp={this.state.user_exp} maxExp={this.state.user_max_exp} />{' '}
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
        <Menubar
          user_data={this.state}
          user_id={this.state.user_id}
          newEnergy={() => this.getNewEnergy(this.state.user_id)}
          setCooldownTime={() => this.setCooldownTime(this.state.user_id)}
        />
      </div>
    );
  }
}
