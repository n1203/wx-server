const { default: axios } = require("axios");
const { APIS } = require("../const/api");

const getDanwangData = async () => {
    const currentDate = new Date().toISOString().split('T')[0].split('-').join('');
    const url = `${APIS.DANWANG}?beginDate=${currentDate}&endDate=${currentDate}`
    const [top1] = await axios.get(url).then(res => res.data?.data)
    return top1
}

/**
 * 获取今日单王
 * @returns 
 */
const getDanwang = async () => {
    const top1 = await getDanwangData()
    return `🎉 今日单王：${top1?.realName}，完成${top1?.total}单`
}

module.exports = {
    getDanwangData,
    getDanwang
}