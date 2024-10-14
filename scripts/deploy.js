// curl http://122.51.7.85:3000/daily
const { $, spinner } = require("zx")


const run = async () => {

    await spinner("拉取最新代码(1/3)", async () => {
        await $`git pull`
    })

    await spinner("提交代码(2/3)", async () => {
        await $`git add . && git commit -m "deploy-${new Date().toLocaleString()}" && git push --set-upstream origin main && git push`
    })

    await spinner("部署(3/3)", async () => {
        await $`ssh root@122.51.7.85 "cd ~/wx-server && git pull && npm run restart"`
    })

    console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")
}

run()