const pool = require('../databases/ddrun')

const flat = (arr) => {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val) : val), [])
}

/**
 * 获取订单
 * @returns 
 */
const getOrder = async (id) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM \`school_orders\` WHERE \`orderNo\` = ${id}`)
        return rows[0]
    } catch (error) {
        logger.error('Error in getOrder:', error);
        return null
    }
}

const getPrintFileByOrderNo = async (orderNo) => {
    try {
        const order = await getOrder(orderNo)
        console.log(order)
        if (!order) return null
        const files = flat(order.priceDetails.files.map(file => file.value))
        return files
    } catch (error) {
        logger.error('Error in getPrintFileByOrderNo:', error);
        return null
    }
}

module.exports = {
    getOrder,
    getPrintFileByOrderNo
}