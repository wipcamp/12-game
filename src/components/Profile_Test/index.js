import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Progressbar from '../Profile/Progressbar';
import Character from '../Profile/Character';
import styled from 'styled-components';
import Menubar from '../Profile/Menubar';
import Countdown from '../Profile/Countdown';
import Cookies from 'js-cookie';
import ContainerButton from './Container/ContainerButton';
import ProfileTest from './Profile'
import Map from '../Map/index';
import MiniGameModal from '../Profile/MiniGameModal'

const loginGameUrl = 'https://game.freezer.wip.camp/login';
// const loginGameUrl = 'http://localhost:3000/login'

const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(/image/MainBG.png);
  background-size: contain;
  z-index: 0;
`;

const Img = styled.img`
  height: 7vh;
  width: 7vh;
  border: 1px solid #000000;
  border-radius: 50%;
  margin: auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  flex-direction: row;
  width: 100vw;
  padding-bottom: 1em;
  margin: 4.6rem auto 0 auto;
  bottom: 0;

  button:nth-child(odd) {
    margin: auto;
  }

  button:nth-child(even) {
    margin: auto;
  }
`;

export default class Profile extends Component {
  state = {
    user_id: '',
    user_level: 0,
    user_str: 0,
    user_dex: 0,
    user_luk: 0,
    user_energy: 0,
    user_max_energy: 0,
    user_name: '',
    user_team_name: '',
    user_exp: 0,
    user_max_exp: 0,
    cooldown_time: new Date(2020, 0, 13, 23, 40, 0),
    time: null,
    point: 0,
    isLevelUp: false,
    onTimeOut: false,
    button: {
      home: {
        name: 'home',
        src: 'https://img.icons8.com/cute-clipart/64/000000/home.png'
      },
      minigame: {
        name: 'minigame',
        src: 'https://img.icons8.com/cute-clipart/64/000000/controller.png'
      },
      map: {
        name: 'map',
        src: 'https://img.icons8.com/cute-clipart/64/000000/map.png'
      },
      test: {
        name: 'comingsoon',
        src: 'https://img.icons8.com/color/48/000000/activity-history.png'
      }
    },
    screen: 'home',
    showModal: false
  };

  async componentDidMount() {
    let isDataChange = false;
    const tokenCookies = Cookies.getJSON('token');
    console.log('tokenObject : ' + tokenCookies);
    // if (tokenCookies) {
    console.log('loggedIn');
    const search = window.location.search.substring(1);
    if (search) {
      // if(false){
      console.log('searched');
      const verifyCodeMiniGame = JSON.parse(
        '{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
        function (key, value) {
          return key === '' ? value : decodeURIComponent(value);
        }
      );
      const userId = verifyCodeMiniGame.userId;
      const verifyCode = verifyCodeMiniGame.verifyCode;
      const timeStart = verifyCodeMiniGame.timeStart;
      const score = verifyCodeMiniGame.score;
      const timePlay = verifyCodeMiniGame.timePlay;
      if (userId && verifyCode && timeStart && score && timePlay) {
        console.log('have enough param');
        const verifyMiniGameCookie = Cookies.get('verifyCode');
        console.log('verifyInCookies : ' + verifyMiniGameCookie);
        console.log('verify in param : ' + verifyCode);
        console.log(userId);
        console.log(verifyCode);
        console.log(timeStart);
        console.log(score);
        console.log(timePlay);
        if (verifyMiniGameCookie == verifyCode) {
          isDataChange = true;
          console.log('same code');
          let res = await profileService.getExp(userId, score);
          console.log(res);
          console.log(res.data);
          if (res) {
            Cookies.remove('verifyCode', {
              domain: 'game.freezer.wip.camp',
              path: ''
            });
            console.log('removed verifyCode');
            console.log('checkCookiesPass');
            //const userId = tokenCookies.userId
            //console.log('userId in cookies : ' + tokenCookies.userId)
            // const userId = Cookies.get('userId')
            console.log('userId : ' + userId);
            this.getProfileData(userId);
          }
        }
      }
    }
    if (isDataChange == false) {
      // if (true) {
      Cookies.remove('verifyCode', {
        domain: 'game.freezer.wip.camp',
        path: ''
      });
      console.log('removed verifyCode');
      console.log('checkCookiesPass');
      // console.log('userId in cookies : ' + tokenCookies.userId)
      //const userId = tokenCookies.userId
      // const userId = Cookies.get('userId')
      //console.log('userId : ' + userId)
      this.getProfileData(this.props.profileId);
    }
    // } else {
    //   window.location.href = loginGameUrl
  }
  // }

  async addEnergy(energyAdd, newCooldown) {
    const { user_energy, user_max_energy, cooldown_time, user_id } = this.state;
    const final_energy_add =
      this.state.onTimeOut == true ? energyAdd : energyAdd + 1;
    this.setState({
      onTimeOut: false
    });
    if (
      this.state.user_max_energy >
      this.state.user_energy + final_energy_add
    ) {
      console.log('addEnergy' + final_energy_add);
      let totalEnergy = user_energy + final_energy_add;
      await profileService.setEnergy(user_id, totalEnergy);
      this.setCooldownTime(user_id, newCooldown);
      this.getNewEnergy(user_id);
    } else if (
      this.state.user_max_energy ==
      this.state.user_energy + final_energy_add
    ) {
      console.log('equals');
      let totalEnergy = user_energy + final_energy_add;
      await profileService.setEnergy(user_id, totalEnergy);
      this.getNewEnergy(user_id);
      console.log(this.state.user_energy);
      this.setState({
        cooldown_time: null
      });
    } else {
      console.log(
        'add full energy' +
        (this.state.user_max_energy - this.state.user_energy)
      );
      let totalEnergy = user_max_energy;
      await profileService.setEnergy(user_id, totalEnergy);
      this.getNewEnergy(user_id);
      this.setState({
        cooldown_time: null
      });
    }
  }

  getRemainingTime(cooldown) {
    let { time } = this.state;
    let cooldown_time = new Date(cooldown);
    let current_time = new Date();
    console.log('cool' + cooldown_time);
    console.log('current' + current_time);
    if (this.state.user_max_energy > this.state.user_energy) {
      if (cooldown_time >= current_time) {
        let remaining = Math.abs(cooldown_time - current_time);
        let min = Math.floor(remaining / 60000);
        let sec = ((remaining % 60000) / 1000).toFixed(0);
        console.log('ยังไม่ถึงเวลา');
        console.log('remaining' + remaining);
        console.log('toTime' + min + ':' + (sec < 10 ? '0' : '') + sec);
        console.log(time);
        this.setState({
          time: {
            min: min,
            sec: sec
          }
        });
        console.log(this.state.time);
      } else {
        let remaining = Math.abs(current_time - cooldown_time);
        let pre_min = Math.floor(remaining / 60000);
        let pre_sec = ((remaining % 60000) / 1000).toFixed(0);
        let pre_energy_add = Math.floor(pre_min / 60);
        console.log('energy_add' + Math.floor(pre_min / 60));
        console.log(pre_energy_add);
        let min = 59 - (pre_min % 60);
        let sec = 60 - pre_sec;
        console.log('premin' + pre_min);
        console.log('presec' + pre_sec);
        console.log('เกินเวลาแร้วแม่');
        console.log('remaining' + remaining);
        console.log('toTime' + min + ':' + (sec < 10 ? '0' : '') + sec);
        console.log(time);
        this.setState({
          time: {
            min: min,
            sec: sec
          }
        });
        current_time.setMinutes(current_time.getMinutes() + min);
        current_time.setSeconds(current_time.getSeconds() + sec);
        console.log('newDate : ' + current_time);
        this.addEnergy(pre_energy_add, current_time.getTime());
        console.log(this.state.time);
      }
    } else {
      console.log('full');
    }
  }

  async getNewEnergy(id) {
    let data = await profileService.getProfile(id);
    console.log('get new' + data.data.energy);
    this.setState({
      user_energy: data.data.energy
    });
    console.log('new energy' + this.state.user_energy);
  }

  async setCooldownTime(id, newDate) {
    await profileService.setCooldownTime(id, newDate);
    let data = await profileService.getCooldownTime(id);
    let cooldownTime = data.data;
    this.setState({
      cooldown_time: cooldownTime
    });
    console.log(cooldownTime);

    this.getRemainingTime(this.state.cooldown_time);
    console.log('setting complete');
    console.log('new cooldown' + this.state.cooldown_time);
  }

  async getProfileData(id) {
    // let data = await profileService.getProfile(id);
    let data = await profileService.getProfileTest();
    //check if no data redirect to gamePr
    let cooldown_time = await profileService.getCooldownTime(id);
    let userGame = data.data;
    console.log('Data: ' + userGame);
    const team = userGame.team;
    console.log('team object : ' + team);
    // console.log('team name : ' + team.teamName);
    let cooldownTime = cooldown_time.data;
    console.log(cooldownTime);
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
      point: userGame.point,
      cooldown_time: cooldownTime
    });
    if (this.state.user_max_energy > this.state.user_energy) {
      this.getRemainingTime(cooldownTime);
    } else {
      console.log('energy is full');
    }
    if (this.state.point > 0) {
      this.setState({
        isLevelUp: true
      });
    }
  }

  onTimeOut() {
    this.setState({
      onTimeOut: true
    });
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 1);
    this.addEnergy(1, newDate.getTime());
    console.log('getTime log: ' + newDate.getTime());
  }

  async getNewStatus(userId) {
    let data = await profileService.getProfile(userId);
    this.setState({
      user_str: data.data.str,
      user_dex: data.data.dex,
      user_luk: data.data.luk,
      point: data.data.point
    });
    if (this.state.point <= 0) {
      this.setState({
        isLevelUp: false
      });
    }
  }

  handleShow = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false })
  }

  getMenubar() {
    return (
      <Container>
        <button onClick={() => this.handleAction('home')}>
          <Img src={this.state.button.home.src} alt={this.state.alt} />
        </button>
        <button onClick={() => this.handleAction('map')}>
          <Img src={this.state.button.map.src} alt={this.state.alt} />
        </button>
        <button onClick={() => this.handleAction('minigame')}>
          <Img
            src={this.state.button.minigame.src}
            alt={this.state.alt}
          />
        </button>
        <button onClick={() => this.handleAction('test')}>
          <Img src={this.state.button.test.src} alt={this.state.alt} />
        </button>
      </Container>
    );
  }


  handleAction(pwd) {
    switch (pwd) {
      case 'home':
        this.setState({
          screen: 'home'
        });
        break;
      case 'map':
        this.setState({
          screen: 'map'
        });
        break;
      case 'minigame':
        this.handleShow()
      default:
        break;
    }
  }

  render() {
    return (
      <Bg>
        {this.state.screen === 'map' ? (
          <Map />
        ) : this.state.screen === 'home' ? (
          <ProfileTest data={this.state}/>
        ) : (
              ''
            )}
        {this.getMenubar()}
        <MiniGameModal
          show={this.state.showModal}
          onHide={this.handleClose}
          user_data={this.state.user_energy}
        />
      </Bg>
    );
  }
}
