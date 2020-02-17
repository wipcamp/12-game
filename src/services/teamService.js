import api from '../utils/apiGameUserService'

 const teamService = {
    getTeamScore: async () => {
        let res = await api.get(`/scoreBoardCamp`)
        return res
    }
}

export default teamService