const { prisma } = require("../prisma/connections")

/**
 * 创建用户
 * @param {*} user 
 * @returns 
 */
const createUser = async (user) => {
    return await prisma.user.upsert({
        data: user
    })
}

/**
 * 添加聊天记录
 * @param {*} userId 
 * @param {*} chatRecord 
 * @returns 
 */
const addChatRecord = async (userId, chatRecord) => {
    return await prisma.chatRecord.create({
        data: { ...chatRecord, userId }
    })
}

/**
 * 查找用户
 * @param {*} userId
 * @returns
 */
const getUser = async (userId) => {
    return await prisma.user.findUnique({ where: { id: userId } })
}

module.exports = { createUser, addChatRecord, getUser }