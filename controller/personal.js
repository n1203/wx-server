const { GROUPS } = require("../const/groups");
const sendMsg = require("../service/msg");

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
    }
}

module.exports = hyjpController;