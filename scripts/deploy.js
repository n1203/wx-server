// curl http://122.51.7.85:3000/daily
const { $ } = require("zx")

const run = async () => {

    await $`git add . && git commit -m "deploy-${new Date().toLocaleString()}" && git push --set-upstream origin main && git push`

    await $`ssh root@122.51.7.85 "cd ~/wx-server && git pull && npm run stop && npm run pm2"`

    console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")
}

run()