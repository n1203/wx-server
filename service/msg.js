const { default: axios } = require("axios");
const { APIS } = require("../const/api");
const buildTargetData = require("../utils/build-taget-data");
const { GROUPS } = require("../const/groups");

/**
 * 发送微信消息
 * @param {string} content 
 * @param {string} to 
 * @returns 
 */
const sendMsg = async (content, to = GROUPS.XP.HZ, isImg = false) => {
    // if (isImg) {
    //   await axios.post(APIS.WX_FILE_MSG, {
    //     to,
    //     isRoom: true,
    //     content,
    //   })
    // } else {
    const targetData = buildTargetData(content, to, isImg);
    await axios.post(APIS.WX_MSG, targetData)
    // }
}

module.exports = sendMsg