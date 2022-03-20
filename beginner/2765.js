const { readFileSync } = require("fs")
const [text] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log(text.replace(",", "\n"))