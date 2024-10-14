
/**
成本清单
1. 采购程序 1999
2. 服务器一年期 79
3. 微信提现审核手续费（淘宝） 99
4. 打印机 1080
5. 打印纸 65
 */
const cost = `1999 + 99 + 79 + 1080 + 65`

module.exports = {
    evalCost: Math.round(eval(cost)),
    cost,
}