const { prisma } = require("../prisma/connections")

/**
 * 创建用户
 * @param {*} user 
 * @returns 
 */
const createUser = async (user) => {
    console.log('user', user)
    delete user.meta.create.phone
    delete user.email
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
    console.log('chatRecord', chatRecord)
    return await prisma.chatRecord.create({
        data: { ...chatRecord, userId }
    })
}

/**
 * 查找用户
 * @param {string} wxId 微信ID
 * @returns {Promise<User|null>}
 * 
 * nArgument `where` of type UserWhereUniqueInput needs at least one of `id` or `email` arguments. Available options are marked with ?.\n    at Dn
 */
const getUser = async (wxId) => {
    return await prisma.user.findFirst({
        where: {
            wxId
        }
    })
}

/**
 * 获取用户信息
 * @param {*} wxId 
 * @returns 
 */
const getUserInfo = async (wxId) => {
    const user = await getUser(wxId)
    return await prisma.userMeta.findFirst({ where: { userId: user.id } })
}

module.exports = { createUser, addChatRecord, getUser, getUserInfo }