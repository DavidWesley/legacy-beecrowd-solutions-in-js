const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(/\s+/g, 4)

if (input.includes("1")) console.log(input.indexOf("1") + 1)