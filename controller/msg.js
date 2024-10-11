const { GROUPS } = require("../const/groups");
const { generateDanWangSVG } = require("../danwang");
const getTodayOrder = require("../service/cost");
const { getDanwangData, getDanwang } = require("../service/danwang");
const sendMsg = require("../service/msg");
const svgToPng = require("../utils/svg-to-png");
const userService = require("../service/user");
const tokenService = require("../service/token");
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
        try {
            const { source, content } = req.body
            console.log('source', source)
            if (!content) {
                return res.sendStatus(200);
            }
            const sourceJSON = JSON.parse(source)
            if (!sourceJSON?.room) {
                logger.warn(`sourceJSON.room is not exist`)
                return res.sendStatus(200);
            }
            const topic = sourceJSON?.room?.payload?.topic
            const isCustomerTopic = sourceJSON?.room?.payload?.topic?.includes('新能源') || sourceJSON?.room?.payload?.topic?.includes('新漂')
            if (!isCustomerTopic) {
                return res.sendStatus(200);
            }
            console.log('id', sourceJSON.from.id)
            let user = await userService.getUser(sourceJSON.from.id)
            if (!user) {
                const payload = sourceJSON.from.payload
                delete payload.id
                user = await userService.createUser({
                    wxId: sourceJSON.from.id,
                    email: '',
                    name: sourceJSON.from.name,
                    meta: {
                        create: {
                            alias: payload.alias,
                            avatar: payload.avatar,
                            friend: payload.friend,
                            gender: payload.gender,
                            name: payload.name,
                            city: payload.city,
                            address: payload.address,
                            province: payload.province,
                            signature: payload.signature,
                            star: payload.star,
                            type: payload.type,
                        }
                    },
                })
            }
            await userService.addChatRecord(user.id, {
                content,
            })
            const [key, value] = content.split(' ')
            let userinfo = await userService.getUserInfo(sourceJSON.from.id)
            const name = userinfo?.name || userinfo.name
            if (key === '@#新漂青年') {
                switch (value) {
                    case '余额':
                        const token = await tokenService.getToken(userinfo.id)
                        await sendMsg(`@${name} 您当前积分为：${token?.balance || 0}`, topic);
                        break;
                    case '签到':
                        const reward = +(Math.random() * 3).toFixed(4)
                        const tokenRes = await tokenService.createToken(userinfo.id,
                            reward,
                            '1'
                        )
                        if (tokenRes === 100) {
                            await sendMsg(`@${name} 今天已经签到过了`, topic);
                            break;
                        }
                        await sendMsg(`@${name} 签到成功，获得${reward}积分, 当前积分为${tokenRes?.balance || 0}`, topic);
                        break;
                    default:
                        await sendMsg(`我支持如下指令：
@#新漂青年 余额
@#新漂青年 签到`, topic);
                        break;
                }
            }
            return res.sendStatus(200);
        } catch (error) {
            logger.error('Error in receive controller:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = controller;