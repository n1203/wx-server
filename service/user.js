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
        update: {
            alias: user.meta.create.alias,
            avatar: user.meta.create.avatar,
            friend: user.meta.create.friend,
            gender: user.meta.create.gender,
            name: user.meta.create.name,
            city: user.meta.create.city,
            address: user.meta.create.address,
            province: user.meta.create.province,
            signature: user.meta.create.signature,
            star: user.meta.create.star,
            type: user.meta.create.type,
        },
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

module.exports = { createUser, addChatRecord, getUser }