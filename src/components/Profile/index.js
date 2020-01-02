import React, { Component } from "react";
import profileService from "../../services/profileService";
import Progressbar from "./Progressbar";
import Character from "./Character"
import styled from 'styled-components'
import SideNavbar from './SideNavbar'

export default class Profile extends Component {
  state = {
    user_test_data: {},
    sample_id: 1,
    percentExp: 0,
    user_level : 0,
    user_str : 0,
    user_dex : 0,
    user_luk : 0
  };

  componentDidMount() {
    this.getProfileData(this.state.sample_id);
  }

  async getProfileData(id) {
    let data = await profileService.getProfile(id);
    this.setState({
      user_test_data: data.data,
      percentExp: (data.data.exp*data.data.maxExp)/100,
      user_level : data.data.level,
      user_str : data.data.str,
      user_dex : data.data.dex,
      user_luk : data.data.luk
    });
  }

  render() {
    return (
      <div className="container">
        <SideNavbar/>
        <Progressbar
          color="warning"
          percent={this.state.percentExp}
          level = {this.state.user_level}
          status="Level"
        />
        user_id : {this.state.user_test_data.id}
        <br />
        team : {this.state.user_test_data.team}
        <br />
        energy : {this.state.user_test_data.energy}
        <br />
        max_energy : {this.state.user_test_data.maxEnergy}
        <br />
        <Character level={this.state.user_level}/>
        <Progressbar
          color="warning"
          percent={this.state.user_str}
          level = {this.state.user_str}
          status="str"
        />
        <Progressbar
          color="warning"
          percent={this.state.user_dex}
          level = {this.state.user_dex}
          status="dex"
        />
        <Progressbar
          color="warning"
          percent={this.state.user_luk*10}
          level = {this.state.user_luk}
          status="luk"
        />
      </div>
    );
  }
}
