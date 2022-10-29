const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n", 1)

const LONG_NAME_MONTH = new Date(`2021-${input.at(0)}-1`).toLocaleDateString("en-us", { month: "long" })

console.log(LONG_NAME_MONTH)
