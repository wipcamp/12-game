import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const profileService = {
    lineLogin : async (code) => {
        let res = await api.post(`/gameauth/?code=${code}`)
        return res;
    },
  
  }
  
  export default profileService

