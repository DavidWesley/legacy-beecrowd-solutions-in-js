const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8")

const [x, y] = input.split("\n").map(int => parseInt(int))

const sum = x + y
console.log(`X = ${sum}`)