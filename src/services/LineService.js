import api from '../utils/apiLineService'
// import Cookies from './CookieService'

const lineService = {
    lineLogin : async (code) => {
        let res = await api.get(`/authForGame?code=${code}`)
        return res;
    },
    getGenerateCode : async()=>{
        let res = await api.get(`/getGenerateCode`)
        return res;
    }
  }
  
  export default lineService

