const { TOKEN, WX_API } = require("./token")

const APIS = {
    /**
     * 发送微信消息
     * token 参数在 .env 中
     * @param {string} content 
     * @param {string} to 
     * @returns 
     */
    WX_MSG: `${WX_API}/webhook/msg/v2?token=${TOKEN}`,
    WX_FILE_MSG: `${WX_API}/webhook/msg?token=${TOKEN}`,
    LOGIN: `${WX_API}/login?token=${TOKEN}`,
    HEALTH: `${WX_API}/healthz?token=${TOKEN}`,
    /**
     * 获取今日单王
     * @param {string} beginDate 
     * @param {string} endDate 
     * @returns {"sign":"X3c1LnUbHaeL42a6FvOzXseOdgOKDHoVJ0eqCZsdQf4=","msg_type":"interactive","card":{"elements":[{"tag":"div","text":{"content":"单号: 20241007234502798736467\n**赏金: 0元**\n*起点: 无地址信息*\n*终点: 无地址信息*","tag":"lark_md"}},{"tag":"hr"},{"tag":"markdown","content":"描述:\n游戏陪玩"},{"tag":"action","actions":[{"tag":"button","text":{"tag":"plain_text","content":"接单"},"type":"primary","multi_url":{"url":"https://wxaurl.cn/rB6aPDnl95r","android_url":"","ios_url":"","pc_url":""}}]}],"header":{"template":"blue","title":{"content":"👏👏👏新订单通知","tag":"plain_text"}}},"timestamp":1728315903}
     */
    DANWANG: "https://kuaidian.malimawai.cn/admin/school/analysis/taker",
    /**
     * 获取今日订单
     * @returns 
     */
    TODAY_ORDER: "https://kuaidian.malimawai.cn/admin/school/analysis/total?type=update",
}

module.exports = {
    APIS,
}