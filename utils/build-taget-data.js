const { GROUPS } = require("../const/groups");

/**
 * 构建目标数据
 * @param {string} content 
 * @param {string} to 
 * @returns 
 */
const buildTargetData = (content, to = GROUPS.XP.HZ, isImg = false) => {
    const res = {
        to,
        isRoom: true,
        data: {
            content,
        },
    };
    if (isImg) {
        res.data.type = 'fileUrl'
    }
    return res
}

module.exports = buildTargetData