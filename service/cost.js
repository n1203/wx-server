const { default: axios } = require("axios");
const { APIS } = require("../const/api");
const { evalCost, cost } = require("../const/cost");

/**
 * 获取今日订单
 * @returns 
 */
const getTodayOrder = async () => {
    const { data: { data } } = await axios.get(APIS.TODAY_ORDER);
    return `总平台收入: ${data?.incomeTotal || 0}元
今日订单: ${data?.yesterdayTradeTotal}元
今日用户: ${data?.userTotal}人 (+${data?.yesterdayUserTotal || 0}人)
今日订单完成: ${data?.yesterdayOrderCompleteTotal || 0}
-------
💰 累计收益：${data?.incomeTotal - evalCost} 元(综合成本 ${cost})`
}

module.exports = getTodayOrder