import api from '../utils/apiGameUserService'
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId) => {
        let res = await api.get(`/profile?id=${lineId}`)
        return res;
    },
    useEnergy : async (lineId) => {
        let res = await api.post(`/useEnergy?id=${lineId}`)
        return res;
    },
    setCooldownTime : async (lineId,remainTime) => {
        let res = await api.put(`/setCooldownEnergyTime?id=${lineId}&remainTime=${remainTime}`)
        return res;
    },
    getCooldownTime : async (lineId) => {
        let res = await api.get(`/getCooldowntime?id=${lineId}`)
        return res;
    },
    setEnergy : async (lineId,energy) => {
        let res = await api.post(`/setEnergy?id=${lineId}&&energy=${energy}`)
        return res;
    },
    setVerifyCookies : async (state,nonce) => {
        let res = await api.get(`/setVerifyCookies?state=${state}&nonce=${nonce}`)
        return res
    },
    getExp : async (id,score) => {
        let res = await api.put(`/gameOver?id=${id}&score=${score}`)
        return res
    }
    // getProfileByUserId
  
  }
  
  export default profileService

