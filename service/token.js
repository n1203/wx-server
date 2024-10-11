const { prisma } = require("../prisma/connections")

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
        return await prisma.token.upsert({
            where: { userId, collection },
            update: { balance: { increment: balance } },
            create: { balance, collection, userId }
        })
    }
}