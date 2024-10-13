const schedule = require('node-schedule');
const personalController = require('../controller/personal');

// 每个小时执行一次, 启动时候执行一次
const init = () => {
    schedule.scheduleJob('0 * * * *', async () => {
        personalController.goldPrice(); // 启动时立即执行一次
        // 晚上24:00-06:00不执行
        const now = new Date()
        if (now.getHours() >= 6 && now.getHours() < 24) {
            await personalController.goldPrice()
        }
        return Promise.resolve()
    })
}

module.exports = {
    init
}