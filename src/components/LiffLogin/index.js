import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Profile from '../Profile/index';




const liff = window.liff;
export default class LiffLogin extends Component {

    state = {
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
        cooldown_time: null,
        isLogedIn: false
    };

    componentDidMount() {
        if(liff){
            console.log(liff)
        }
        liff
            .init({
                liffId: '1653691835-vZ4GNK7z'
            })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    liff.login();
                }
            })
            .catch(err => {
                console.log(err);
            });
        // if (liff.isLoggedIn()) {
        //     this.getProfile()
        //     this.getProfileData();
        //     console.log('test')
        // } else {
        //     window.location.href = 'http://localhost:3007'
        // }
    }


    getProfile() {
        liff.getProfile().then(dataInfo => {
            this.setState({
                user_id: dataInfo.userId
            })
        });
    }

    async getProfileData(id) {
        let data = await profileService.getProfile(id);
        let cooldown_time = await profileService.getCooldownTime(id);
        //console.log('game data : '+data)
        let userGame = data.data
        let cooldownTime = cooldown_time.data
        //let cooldownTime = this.state.cooldown_time
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
            cooldown_time: cooldownTime,
            isLogedIn: true
        });
        //console.log('game data.data : '+userGame)
    }

    render() {
        if (this.state.isLogedIn) {
            return <Profile profileData={this.state} />
        } else {
            return <p>loading</p>
        }
    }
}