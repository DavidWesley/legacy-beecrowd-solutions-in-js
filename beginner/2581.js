const { readFileSync } = require("fs")
const [N] = readFileSync("/dev/stdin", "utf8").split("\n")

const DEFAULT_RESP = "I am Toorg!"

for (let i = Number.parseInt(N, 10); i > 0; i--) console.log(DEFAULT_RESP)