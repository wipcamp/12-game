import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Progressbar from './Progressbar';
import Character from './Character';
import styled from 'styled-components';
import Menubar from './Menubar';
import Countdown from './Countdown'
import Cookies from 'js-cookie';

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

const liff = window.liff;
export default class Profile extends Component {

  state = {
    user_id: "1",
    user_level: 0,
    user_str: 0,
    user_dex: 0,
    user_luk: 0,
    user_energy: 0,
    user_max_energy: 0,
    user_name: "",
    user_team_name: "",
    user_exp: 0,
    user_max_exp: 0,
    cooldown_time: new Date()
  };

  componentDidMount() {
    // const tokenCookies = Cookies.getJSON('token')
    // console.log('tokenObject : '+tokenCookies)
    // if(tokenCookies){
    //   console.log('checkCookiesPass')
    //   console.log('userId in cookies : '+tokenCookies.userId)
    //   const userId = tokenCookies.userId
    //   console.log('userId : '+userId)
    //   //console.log('state : '+this.state.user_id)
    //   this.getProfileData(userId);
    // }else{
    //   window.location.href = loginGameUrl
    // }

    this.getProfileData(this.state.user_id);
    // let date = new Date(2020, 0, 12, 11, 24, 0);
    // this.setState({
    //   cooldown_time: date
    // })

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

  addEnergy() {
    //ส่งเวลาปัจจุบันไปเช็คกับเวลาอัพเดท ที่หลังบ้าน
    console.log("addEnergy"+this.state.cooldown_time);
    //this.getRemainingTime(this.state.cooldown_time);
  }

  getProfile() {
    liff.getProfile().then(dataInfo => {
      this.setState({
        user_id: dataInfo.userId
      })
    });
  }

  getRemainingTime(cooldown) {
    let cooldown_time = new Date(cooldown);
    let current_time = new Date();
    console.log("cool"+cooldown_time)
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
        time : time
      })
    } else {
      let remaining = Math.abs(current_time - cooldown_time);
      let pre_min = Math.floor(remaining / 60000);
      let pre_sec = ((remaining % 60000) / 1000).toFixed(0);
      let energy_add = Math.floor(pre_min / 60);
      let min = pre_min % 60;
      let sec = pre_sec;
      let time = { min, sec , energy_add}
      console.log("เกินเวลาแร้วแม่")
      console.log("remaining" + remaining)
      console.log("toTime" + min + ":" + (sec < 10 ? '0' : '') + sec)
      console.log(time)
      this.setState({
        time : time
      })
    }
  }

  async getProfileData(id) {
    let data = await profileService.getProfile(id);
    let cooldown_time = await profileService.getCooldownTime(id);
    //console.log('game data : '+data)
    let userGame = data.data
    let cooldownTime = cooldown_time.data
    console.log(cooldownTime)
    this.setState({
      user_id: userGame.id,
      user_level: userGame.level,
      user_str: userGame.str,
      user_dex: userGame.dex,
      user_luk: userGame.luk,
      user_energy: userGame.energy,
      user_max_energy: userGame.maxEnergy,
      user_name: userGame.name,
      user_team_name: userGame.team.teamName,
      user_exp: userGame.exp,
      user_max_exp: userGame.maxExp,
      cooldown_time : cooldownTime
    });
    if (this.state.user_max_energy > this.state.user_energy) {
      //let date = new Date();
      this.getRemainingTime(cooldownTime)
      this.addEnergy()
    } else {
      console.log("energy is full")
    }
    //console.log('game data.data : '+userGame)
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
      cooldown_time : cooldownTime
    })
    console.log(cooldownTime)

    this.getRemainingTime(this.state.cooldown_time);
    console.log("setting complete")
    console.log("new cooldown" + this.state.cooldown_time)
  }

  render() {
    console.log(this.state.cooldown_time)
    console.log("time"+this.state.time)
    return (
      <div>
        <div className="container">
          <CenterComponent>
          <Countdown 
          minute={this.state.time==null?999:this.state.time.min} 
          second={this.state.time==null?999:this.state.time.sec}
          onTimeOut={()=>this.addEnergy()}
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
