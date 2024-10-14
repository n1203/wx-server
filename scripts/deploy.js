// curl http://122.51.7.85:3000/daily
const { $, spinner } = require("zx")

// -sd 单部署
const argv = process.argv.slice(2)

const isSingleDeploy = argv.includes("-sd")

const steps = {
    pull: ["拉取最新代码", async () => {
        await $`git pull`
    }],
    commit: ["提交代码", async () => {
        await $`git add . && git commit -m "deploy-${new Date().toLocaleString()}" && git push --set-upstream origin main && git push`
    }],
    deploy: ["部署", async () => {
        await $`ssh root@122.51.7.85 "cd ~/wx-server && git pull && npm run restart"`
    }],
}

const runStep = async (_steps) => {
    for (const step of _steps) {
        await spinner(`${step[0]} (1/${_steps.length})`, step[1])
    }
}

const run = async () => {
    if (isSingleDeploy) {
        await runStep([steps.deploy])
    } else {
        await runStep(Object.values(steps))
    }

    console.log("部署成功, 请访问 http://122.51.7.85:3000/danwang.png 测试")
}

run()