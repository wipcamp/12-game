import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const profileService = {
    lineLogin : async () => {
        let res = await api.get('/gameauth')
        return res;
    },
  
  }
  
  export default profileService

