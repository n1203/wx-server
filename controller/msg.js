const { GROUPS } = require("../const/groups");
const { generateDanWangSVG } = require("../danwang");
const getTodayOrder = require("../service/cost");
const { getDanwangData, getDanwang } = require("../service/danwang");
const sendMsg = require("../service/msg");
const svgToPng = require("../utils/svg-to-png");
const userService = require("../service/user");
const logger = require("../utils/logger");

/**
 * 新漂青年接口
 */
const controller = {
    /**
     * 每日数据
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    daily: async (req, res) => {
        try {
            const danwang = await getDanwang()
            const todayOrder = await getTodayOrder()
            await sendMsg(`${todayOrder}
${danwang}`, GROUPS.XP.YY);
        } catch (error) {
            await sendMsg('服务解析订单状态异常', GROUPS.XP.YY)
        } finally {
            return res.sendStatus(200);
        }
    },
    /**
     * 实时订单状态推送
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    webhook: async (req, res) => {
        try {
            const { body } = req;
            const danwang = await getDanwang()
            const divMd = body.card.elements.find((item) => item.tag === "div");
            const descMd = body.card.elements.find((item) => item.tag === "markdown");
            const action = body.card.elements.find((item) => item.tag === "action");
            const content = `${body.card.header.title.content}
  -----------
  ${divMd.text.content}
  ${descMd.content}
  -----------
  ${action?.actions.map((item) => {
                return `${item.text.content}: ${item.multi_url.url}`
            }).join(" ")}
  ${danwang}
  `;
            await sendMsg(content, GROUPS.XP.HZ)
        } catch (error) {
            await sendMsg('服务解析订单状态异常', GROUPS.XP.HZ)
        } finally {
            return res.sendStatus(200);
        }
    },
    danwang: async (req, res) => {
        try {
            const danwang = await getDanwangData()
            const svg = generateDanWangSVG(danwang?.realName, danwang?.total)
            // svg字符串转换为 png
            const pngBuffer = await svgToPng(svg, 622, 400);
            res.set('Content-Type', 'image/png');
            return res.send(pngBuffer);
        } catch (error) {
            console.error('Error in danwang controller:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    sendDamwang: async (req, res) => {
        await sendMsg('http://122.51.7.85:3000/danwang.png', GROUPS.XP.HZ, true)
        return res.sendStatus(200);
    },
    /**
     * 接受消息
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    receive: async (req, res) => {
        // {
        //   "type": "text",
        //   "content": "你好",
        //   "source": "{\"room\":\"\",\"to\":{\"_events\":{},\"_eventsCount\":0,\"id\":\"@f387910fa45\",\"payload\":{\"alias\":\"\",\"avatar\":\"/cgi-bin/mmwebwx-bin/webwxgeticon?seq=1302335654&username=@f38bfd1e0567910fa45&skey=@crypaafc30\",\"friend\":false,\"gender\":1,\"id\":\"@f38bfd1e10fa45\",\"name\":\"ch.\",\"phone\":[],\"star\":false,\"type\":1}},\"from\":{\"_events\":{},\"_eventsCount\":0,\"id\":\"@6b5111dcc269b6901fbb58\",\"payload\":{\"address\":\"\",\"alias\":\"\",\"avatar\":\"/cgi-bin/mmwebwx-bin/webwxgeticon?seq=123234564&username=@6b5dbb58&skey=@crypt_ec356afc30\",\"city\":\"Mars\",\"friend\":false,\"gender\":1,\"id\":\"@6b5dbd3facb58\",\"name\":\"Daniel\",\"phone\":[],\"province\":\"Earth\",\"signature\":\"\",\"star\":false,\"weixin\":\"\",\"type\":1}}}",
        //   "isMentioned": "0",
        //   "isMsgFromSelf": "0",
        //   "isSystemEvent": "0" // 考虑废弃，请使用type类型判断系统消息
        // }
        // await sendMsg(`${JSON.stringify(req.body)}`, GROUPS.XP.YY)

        try {
            const { source } = req.body
            const sourceJSON = JSON.parse(source)
            logger.info(`sourceJSON: ${JSON.stringify(sourceJSON, null, 2)}`)
            if (!sourceJSON?.room) {
                return res.sendStatus(200);
            }
            const isCustomerTopic = sourceJSON?.room?.payload?.topic?.includes('新能源') || sourceJSON?.room?.payload?.topic?.includes('新漂')
            logger.info(`isCustomerTopic: ${isCustomerTopic}, ${sourceJSON.room.topic}`)
            if (!isCustomerTopic) {
                return res.sendStatus(200);
            }
            let user = await userService.getUser(sourceJSON.from.id)
            if (!user) {
                user = await userService.createUser({
                    wxId: sourceJSON.from.id,
                    email: '',
                    name: sourceJSON.from.name,
                    meta: {
                        create: sourceJSON.from.payload
                    },
                })
            }
            await userService.addChatRecord(userRes.id, {
                content: req.body.content,
            })
            return res.sendStatus(200);
        } catch (error) {
            logger.error('Error in receive controller:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = controller;