const { GROUPS } = require("../const/groups")
const sendMsg = require("../service/msg")

module.exports = {
    health: async (req, res) => {
        const result = await axios.get(APIS.HEALTH)
        await sendMsg(`检测：系统服务运行正常(${result?.data})`, GROUPS.XP.YY)
        return res.json(result)
    }
}