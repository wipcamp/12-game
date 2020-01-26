import React, { Component } from 'react';
import profileService from '../../services/profileService';
import Profile from '../Profile/index';




const liff = window.liff;
export default class LiffLogin extends Component {

    state = {
        user_id: "",
        isLogedIn: false
    };

    componentDidMount() {
        if (liff) {
            console.log(liff)
        }
        liff
            .init({
                liffId: '1653691835-vZ4GNK7z'
            })
            .then(async () => {
                if (!liff.isLoggedIn()) {
                    // window.location.href = `http://localhost:3007`
                    this.getProfile()
                } else {
                    this.getProfile()
                }
            })
            .catch(err => {
                console.log(err);
            });
    }


    getProfile() {
        liff.getProfile().then(async (dataInfo) => {
            const responseCheckUser = await profileService.checkUser(dataInfo.userId)
            if (responseCheckUser.data) {
                this.setState({
                    user_id: dataInfo.userId,
                    isLogedIn: true
                })
            } else {
                window.location.href = `http://localhost:3007`
            }
        });
    }


    render() {
        if (this.state.isLogedIn) {
            return <Profile profileId={this.state.user_id} />
        } else {
            return <p>loading</p>
        }
    }
}