const { prisma } = require("../prisma/connections")

/**
 * 创建用户
 * @param {*} user 
 * @returns 
 */
const createUser = async (user) => {
    return await prisma.user.upsert({
        where: { wxId: user.wxId },
        update: user,
        create: user
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
const getUser = async (wxId) => {
    return await prisma.user.findFirst({ where: { wxId } })
}

module.exports = { createUser, addChatRecord, getUser }