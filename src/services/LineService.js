import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const profileService = {
    lineLogin : async (code) => {
        let res = await api.get(`/authForGame/?code=${code}`)
        return res;
    },
  
  }
  
  export default profileService

