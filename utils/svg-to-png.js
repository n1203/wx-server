
const sharp = require('sharp');

/**
 * SVG 字符串转换为 PNG
 * @param {*} svgString 
 * @param {*} width 
 * @param {*} height 
 * @returns 
 */
const svgToPng = async (svgString, width, height) => {
    try {
        const pngBuffer = await sharp(Buffer.from(svgString))
            .resize(width, height)
            .png()
            .toBuffer();
        return pngBuffer;
    } catch (error) {
        console.error('Error converting SVG to PNG:', error);
        throw error;
    }
};

module.exports = svgToPng