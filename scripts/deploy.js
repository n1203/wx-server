// curl http://122.51.7.85:3000/daily
const { $ } = require("zx")

$`git add . && git commit -m "deploy-${new Date().toLocaleString()}" && git push`

$`ssh root@122.51.7.85 "cd ~/wx-server && git pull && npm run restart"`

console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")