import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Progressbar from './Progressbar';
import Character from './Character';
import styled from 'styled-components';
import Menubar from './Menubar';
import Countdown from './Countdown'
import Cookies from 'js-cookie'

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
    // user_id: this.props.profileData.user_id,
    // user_level: this.props.profileData.user_level,
    // user_str: this.props.profileData.user_str,
    // user_dex: this.props.profileData.user_dex,
    // user_luk: this.props.profileData.user_luk,
    // user_energy: this.props.profileData.user_energy,
    // user_max_energy: this.props.profileData.user_max_energy,
    // user_name: this.props.profileData.user_name,
    // user_team_name: this.props.profileData.user_team,
    // user_exp: this.props.profileData.user_exp,
    // user_max_exp: this.props.profileData.user_max_exp,
    // cooldown_time: this.props.profileData.cooldown_time
    user_id: "",
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
    cooldown_time: new Date(2020, 0, 13, 23, 40, 0),
    time: null,
    energy_add: null
  };

  async componentDidMount() {
    let isDataChange = false
    const tokenCookies = Cookies.getJSON('token')
    console.log('tokenObject : ' + tokenCookies)
    if (tokenCookies) {
      console.log('loggedIn')
      const search = window.location.search.substring(1);
      if (search) {
        console.log('searched')
        const verifyCodeMiniGame = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        const userId = verifyCodeMiniGame.userId
        const verifyCode = verifyCodeMiniGame.verifyCode
        const timeStart = verifyCodeMiniGame.timeStart
        const score = verifyCodeMiniGame.score
        const timePlay = verifyCodeMiniGame.timePlay
        if (userId && verifyCode && timeStart && score && timePlay) {
          console.log('have enough param')
          const verifyMiniGameCookie = Cookies.get('verifyCode')
          console.log('verifyInCookies : ' + verifyMiniGameCookie)
          console.log('verify in param : ' + verifyCode)
          console.log(userId)
          console.log(verifyCode)
          console.log(timeStart)
          console.log(score)
          console.log(timePlay)
          if (verifyMiniGameCookie == verifyCode) {
            isDataChange = true
            console.log('same code')
            let res = await profileService.getExp(userId, score)
            console.log(res)
            console.log(res.data)
            if (res) {
              Cookies.remove('verifyCode', { domain: 'game.freezer.wip.camp', path: '' })
              console.log('removed verifyCode')
              console.log('checkCookiesPass')
              console.log('userId in cookies : ' + tokenCookies.userId)
              const userId = tokenCookies.userId
              console.log('userId : ' + userId)
              this.getProfileData(userId)
            }
          }
        }
      }
      if (isDataChange == false) {
        Cookies.remove('verifyCode', { domain: 'game.freezer.wip.camp', path: '' })
        console.log('removed verifyCode')
        console.log('checkCookiesPass')
        console.log('userId in cookies : ' + tokenCookies.userId)
        const userId = tokenCookies.userId
        console.log('userId : ' + userId)
        this.getProfileData('userId')
      }
    } else {
      window.location.href = loginGameUrl
    }

  }

  async addEnergy(energyAdd, newCooldown) {
    const { user_energy, user_max_energy, cooldown_time, user_id } = this.state
    if (this.state.user_max_energy > (this.state.user_energy + energyAdd)) {
      console.log("addEnergy" + energyAdd);
      let totalEnergy = user_energy + energyAdd;
      await profileService.setEnergy(user_id, totalEnergy)
      /*if (this.state.time.min == 0 && this.state.time.sec == 0) {
        const newCooldown = new Date()
        newCooldown.setHours(newCooldown.getHours() + 1)
        this.setCooldownTime(user_id,newCooldown.getTime())
      } else {
        const newCooldown = new Date()
        newCooldown.setMinutes(newCooldown.getMinutes() + this.state.time.min)
        newCooldown.setSeconds(newCooldown.getSeconds() + this.state.time.sec)*/
      this.setCooldownTime(user_id, newCooldown)
      //}
      this.getNewEnergy(user_id)
      // let data = await profileService.getCooldownTime(user_id);
      // let cooldownTime = data.data;
      // this.setState({
      //   cooldown_time: cooldownTime
      // })
    } else if (this.state.user_max_energy == this.state.user_energy + energyAdd) {
      console.log("equals")
      let totalEnergy = user_energy + energyAdd;
      await profileService.setEnergy(user_id, totalEnergy)
      this.getNewEnergy(user_id)
      console.log(this.state.user_energy)
      this.setState({
        cooldown_time: null
      })
    }
    else {
      console.log("add full energy" + (this.state.user_max_energy - this.state.user_energy))
      let totalEnergy = user_max_energy;
      await profileService.setEnergy(user_id, totalEnergy)
      this.getNewEnergy(user_id)
      this.setState({
        cooldown_time: null
      })
    }
  }


  getRemainingTime(cooldown) {
    let { time, energy_add } = this.state
    let cooldown_time = new Date(cooldown);
    let current_time = new Date();
    console.log("cool" + cooldown_time)
    console.log("current" + current_time)
    if (this.state.user_max_energy > this.state.user_energy) {
      if (cooldown_time >= current_time) {
        let remaining = Math.abs(cooldown_time - current_time);
        let min = Math.floor(remaining / 60000);
        let sec = ((remaining % 60000) / 1000).toFixed(0);
        console.log("ยังไม่ถึงเวลา")
        console.log("remaining" + remaining)
        console.log("toTime" + min + ":" + (sec < 10 ? '0' : '') + sec)
        console.log(time)
        this.setState({
          time: {
            min: min,
            sec: sec,
          },
          energy_add: null
        })
        console.log(this.state.time)
      } else {
        let remaining = Math.abs(current_time - cooldown_time);
        let pre_min = Math.floor(remaining / 60000);
        let pre_sec = ((remaining % 60000) / 1000).toFixed(0);
        let pre_energy_add = Math.floor(pre_min / 60);
        console.log("energy_add" + Math.floor(pre_min / 60))
        console.log(pre_energy_add)
        let min = 60 - (pre_min % 60);
        let sec = 60 - (pre_sec);
        if (min <= 0) {
          min = 0;
          sec = pre_sec;
        }
        console.log("เกินเวลาแร้วแม่")
        console.log("remaining" + remaining)
        console.log("toTime" + min + ":" + (sec < 10 ? '0' : '') + sec)
        console.log(time)
        this.setState({
          time: {
            min: min,
            sec: sec,
          }
        })
        let newDate = new Date(current_time.setMilliseconds(remaining))
        console.log('newDate : ' + newDate)
        this.addEnergy(pre_energy_add, newDate.getTime())
        console.log(this.state.time)
      }
    } else {
      console.log("full")
    }
  }

  async getNewEnergy(id) {
    let data = await profileService.getProfile(id);
    console.log("get new" + data.data.energy)
    this.setState({
      user_energy: data.data.energy,
    })
    console.log("new energy" + this.state.user_energy)
  }


  async setCooldownTime(id,newDate) {
    await profileService.setCooldownTime(id,newDate);
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

  async getProfileData(id) {
    let data = await profileService.getProfile(id);
    //check if no data redirect to gamePr
    let cooldown_time = await profileService.getCooldownTime(id);
    let userGame = data.data
    console.log(data.data)
    const team = userGame.team
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
      user_team_name: team.teamName,
      user_exp: userGame.exp,
      user_max_exp: userGame.maxExp,
      cooldown_time: cooldownTime
    });
    if (this.state.user_max_energy > this.state.user_energy) {
      this.getRemainingTime(cooldownTime)
    } else {
      console.log("energy is full")
    }
  }

  onTimeOut() {
    const newDate = new Date()
    newDate.setHours(newDate.getHours + 1)
    this.addEnergy(1, newDate.getTime())
  }

  render() {
    return (
      <div>
        <div className="container">
          <CenterComponent>
            <Countdown
              minute={this.state.cooldown_time == null || this.state.time == null ? 999 : this.state.time.min}
              second={this.state.cooldown_time == null || this.state.time == null ? 999 : this.state.time.sec}
              onTimeOut={() => this.onTimeOut()}
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