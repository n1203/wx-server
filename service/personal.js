const { default: axios } = require("axios")

module.exports = {
    async getGoldPrice() {
        try {
            const 老凤祥金价 = await axios.get('http://s3.ycny.com/2145-2?showapi_appid=1114978&id=5da958e8d3fb8b0eefc6a3ca').then(res => {
                const g = res?.data?.showapi_res_body?.goldPrice || '-'
                return `老凤祥金价：${g}`
            })
            const 上证指数 = await axios.get("https://finance.pae.baidu.com/selfselect/sug?wd=%E4%B8%8A%E8%AF%81&skip_login=1&finClientType=pc").then(res => {
                const s = res.data?.Result?.stock?.[0]
                return `上证指数：${s?.price || 0} (${s?.ratio || 0})`
            })
            const BTC = await axios.get('https://finance.pae.baidu.com/api/getrevforeigndata?query=BTCUSD&finClientType=pc').then(res => {
                const btc = res.data?.Result?.corrCode?.front?.[1]
                const usd = res.data?.Result?.corrCode?.back?.[5]
                return `比特币：${btc?.price?.value || 0} (${btc?.ratio?.value || 0})
美元：${usd?.price?.value || 0} (${usd?.ratio?.value || 0})`
            })
            return `${老凤祥金价}
${上证指数}
${BTC}`
        } catch (error) {
            return '-'
        }
    },
    async nowGoldPriceChart() {
        return `https://image.sinajs.cn/newchart/v5/futures/mins/AU0.gif?${Date.now()}`
    }
}
