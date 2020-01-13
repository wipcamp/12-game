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
    setCooldownTime : async (lineId) => {
        let res = await api.post(`/setCooldownEnergyTime?id=${lineId}`)
        return res;
    },
    getCooldownTime : async (lineId) => {
        let res = await api.get(`/getCooldowntime?id=${lineId}`)
        return res;
    },
    setEnergy : async (lineId,energy) => {
        let res = await api.post(`/setEnergy?id=${lineId}&&energy=${energy}`)
        return res;
    }
    // getProfileByUserId
  
  }
  
  export default profileService

