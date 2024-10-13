// ssh root@122.51.7.85
// password: Aa88888888
// cd /wx-webhook
// git pull
// pnpm i
// pnpm run restart

// test
// curl http://122.51.7.85:3000/daily
const { exec } = require("zx")

exec(`ssh root@122.51.7.85 "cd /wx-webhook && git pull && pnpm i && pnpm run restart"`)

console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")