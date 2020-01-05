import api from '../utils/apiGameUserService'
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId) => {
        let res = await api.get(`/profile?id=${lineId}`)
        return res;
    },
    // getProfileByUserId
  
  }
  
  export default profileService

