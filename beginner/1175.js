const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").slice(0, 20)

const responses = input.reverse().map((value, index) => `N[${index}] = ${value}`)
console.log(`${responses.join("\n")}`)