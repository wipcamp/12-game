import api from '../utils/apiGameUserService'
// import Cookies from './CookieService'

const profileService = {
    getProfile : async (lineId) => {
        let res = await api.get(`/profile/${lineId}`)
        return res;
    },
  
  }
  
  export default profileService

