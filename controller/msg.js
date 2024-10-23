const { GROUPS } = require("../const/groups");
const { generateDanWangSVG } = require("../danwang");
const getTodayOrder = require("../service/cost");
const { getDanwangData, getDanwang } = require("../service/danwang");
const sendMsg = require("../service/msg");
const svgToPng = require("../utils/svg-to-png");
const userService = require("../service/user");
const tokenService = require("../service/token");
const logger = require("../utils/logger");
const orderService = require("../service/order");

const shortUrl = async (url) => {
    try {
        const result = await axios.post(`https://api.uomg.com/api/long2dwz?dwzapi=urlcn&url=${url}`, {
            headers: {
                'Content-Type': 'application/json;',
            }
        })
        return result.data.ae_url
    } catch (error) {
        return url
    }
}

const send = async (body, type) => {
    const isDaying = type === 'daying'
    try {
        let id = ''
        const elements = body.card.elements.map((item) => {
            switch (item.tag) {
                case "markdown":
                    return item?.content || '-'
                case "div":
                    const content = item?.text?.content?.replace('undefined', '-').replace('xundefined', ' - ') || ' - '
                    if (content.includes('单号: ')) {
                        id = content.replace('单号: ', '')
                    }
                    return content
                case "hr":
                    return '-----------'
                case "action":
                    return item.actions.map((action) => {
                        return `${action?.text?.content || '-'}: ${action?.multi_url?.url || '-'}`
                    }).join(" ")
                default:
                    return JSON.stringify(item)
            }
        }).join(`
`)

        let content = `${isDaying ? '@情迷. ' : ''}${body.card.header.title.content}
${elements}
`;
        if (isDaying) {
            const short = await shortUrl(`https://kuaidian.malimawai.cn/s/print-file?orderNo=${id}`)
            content += `打印文件下载：${short}`
        }

        await sendMsg(content, isDaying ? GROUPS.XP.YY : GROUPS.XP.HZ)
        return true
    } catch (error) {
        await sendMsg('服务解析订单状态异常', isDaying ? GROUPS.XP.YY : GROUPS.XP.HZ)
        return false
    }
}

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
            await sendMsg('服务���析订单状态异常', GROUPS.XP.YY)
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
    dayingWebhook: async (req, res) => {
        try {
            await send(req.body, 'daying')
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
            await send(req.body, 'hz')
        } catch (error) {
            await sendMsg('服务解析订单状态异常', GROUPS.XP.HZ)
        } finally {
            return res.sendStatus(200);
        }
    },

    ad: async (req, res) => {
        await sendMsg(`👏 邀请好友使用 #新漂青年 抢不限量快递代取优惠券
📣 新漂青年现已支持「打印」功能，电机小程序下单打印一键直达宿舍～

#小程序://新漂/lHjjkSy2hdGvD9H`, GROUPS.XP.CUSTOMER1)
        return res.sendStatus(200);
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

            // if (/分享的二维���加入群聊/.test(content)) {
            //     // "XU 。"通过扫描"老胡"分享的二维码加入群聊
            //     const name = content.split('通过扫描"')[1].split('"分享的二维码加入群聊')[0]
            //     await userService.updateUser(user.id, {
            //         meta: {
            //             update: { friend: name }
            //         }
            //     })
            // }

            const [key, value] = content.split(' ')
            let userinfo = await userService.getUserInfo(sourceJSON.from.id)
            const name = userinfo?.name || userinfo.name
            if (key === '@#新漂青年') {
                switch (value) {
                    case '余额':
                        const token = await tokenService.getToken(userinfo.id)
                        await sendMsg(`@${name} 您当前积分为：${token?.balance?.toFixed(4) || 0}`, topic);
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
                        await sendMsg(`@${name} 签到成功，获得${reward}积分, 当前积分为${tokenRes?.balance?.toFixed(4) || 0}`, topic);
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
    },
    printFile: async (req, res) => {
        const { orderNo } = req.query
        if (!orderNo) {
            return res.sendStatus(400);
        }
        const files = await orderService.getPrintFileByOrderNo(orderNo)

        // 生成 HTML 页面
        const html = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>打印文件 - 订单 ${orderNo}</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f5f5f5;
                }
                .container {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    max-width: 600px;
                    width: 100%;
                }
                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border-radius: 4px;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
                .button {
                    display: inline-block;
                    padding: 8px 16px;
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                .button:hover {
                    background-color: #45a049;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>订单 ${orderNo} 的打印文件</h1>
                <ul>
                    ${files.map(file => `
                        <li>
                            <a href="${file.path}" target="_blank">${file.name}</a>
                            <a href="${file.path}" download="${file.name}" class="button">下载</a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </body>
        </html>
        `;

        // 设置响应头并发送 HTML
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    }
}

module.exports = controller;
