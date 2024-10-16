const { prisma } = require("../prisma/connections")
const sendMsg = require("./msg")

module.exports = {
    /**
     * 获取用户token
     * @param {*} userId 
     * @returns 
     */
    getToken: async (userId) => {
        return await prisma.token.findFirst({
            where: { userId }
        })
    },
    /**
     * 创建用户token
     * @param {*} userId 
     * @param {*} token 
     * @returns 
     */
    createToken: async (userId, balance, collection = '1') => {
        const token = await prisma.token.findFirst({
            where: { userId, collection }
        })
        if (token && token.updatedAt.getTime() > Date.now() - 24 * 60 * 60 * 1000) {
            return 100
        }
        if (token) {
            return await prisma.token.update({
                where: { id: token.id },
                data: { balance: { increment: balance } }
            })
        }
        return await prisma.token.create({
            data: {
                balance,
                collection,
                userId
            }
        })
    }
}