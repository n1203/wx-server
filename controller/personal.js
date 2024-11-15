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
        const { repository, commits } = req.body
        const repoName = repository?.name
        const branch = repository?.default_branch
        const commitMsg = commits?.[0]?.message
        const committer = commits?.[0]?.committer?.name

        await sendMsg(`[${repoName}] 收到新的推送
分支: ${branch}
提交者: ${committer}
提交信息: ${commitMsg}`, GROUPS.POSTER.DEV)
        return res.sendStatus(200)
    }
}

module.exports = hyjpController;