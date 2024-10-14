// curl http://122.51.7.85:3000/daily
const { $, spinner } = require("zx")

const steps = {
    pull: ["拉取最新代码", async () => {
        await $`git pull`
    }],
    commit: ["提交代码", async () => {
        const date = new Date()
        const tag = `v${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
        const commitMsg = `Release - ${new Date().toLocaleString()}`
        await $`git add . && git commit -m ${commitMsg} && git push --set-upstream origin main && git push`
        // 如果有相同 tag 则删除后再打 tag
        await $`git tag -d ${tag} && git tag -a ${tag} -m "Release ${new Date().toLocaleString()}"`
        await $`git push --tags`
    }],
    deploy: ["部署", async () => {
        await $`ssh root@122.51.7.85 "cd ~/wx-server && git pull && npm run restart"`
    }],
}

const runStep = async (_steps) => {
    for (const [i, step] of _steps.entries()) {
        await spinner(`${step[0]} (${i + 1}/${_steps.length})`, step[1])
    }
}

const run = async () => {
    await runStep(Object.values(steps))
    console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")
}

run()