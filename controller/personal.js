const { GROUPS } = require("../const/groups");
const sendMsg = require("../service/msg");
const personalService = require("../service/personal");

/**
 * 海燕俊平接口
 */
const hyjpController = {
    /**
     * 海燕俊平的短信
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    msg: async (req, res) => {
        try {
            const { body } = req;
            await sendMsg(`${body?.content?.text}
  ${new Date(body?.timestamp).toLocaleString()}`, GROUPS.PERSON.YZM)
        } catch (error) {
            await sendMsg('服务解析订单状态异常', GROUPS.PERSON.YZM)
        } finally {
            return res.sendStatus(200);
        }
    },
    goldPrice: async (req, res) => {
        // const price = await personalService.getGoldPrice()
        const chart = await personalService.nowGoldPriceChart()
        // await sendMsg(price, GROUPS.PERSON.LC)
        await sendMsg(chart, GROUPS.PERSON.LC, true)
        return res.send(price)
    },
    posterDeploySuccess: async (req, res) => {
        const { repository, sender, head_commit } = req.body
        const repoName = repository?.name
        const branch = repository?.default_branch
        const senderName = sender?.login
        const message = head_commit?.message
        const timestamp = head_commit?.timestamp
        const url = head_commit?.url

        await sendMsg(`[${repoName}/${branch}] 推送成功 @${senderName}
提交信息: ${message}
时间：${new Date(timestamp).toLocaleString()}
URL: ${url}`, GROUPS.POSTER.DEV)
        return res.sendStatus(200)
    }
}

module.exports = hyjpController;