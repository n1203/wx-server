const user = require("../service/user")

module.exports = {
    /**
     * 创建用户
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    createUser: async (req, res) => {
        const { user, meta, chatRecord } = req.body
        const result = await user.createUser(user, meta, chatRecord)
        return res.json(result)
    },
    /**
     * 添加聊天记录
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    addChatRecord: async (req, res) => {
        const { userId, chatRecord } = req.body
        const result = await user.addChatRecord(userId, chatRecord)
        return res.json(result)
    }
}