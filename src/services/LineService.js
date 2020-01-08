import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const lineService = {
    lineLogin : async (code,nonce) => {
        let res = await api.get(`/authForGame?code=${code}&nonce=${nonce}`)
        return res;
    },
  
  }
  
  export default lineService

