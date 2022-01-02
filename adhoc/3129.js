const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const figs = lines.slice(0, +numLines)
const uniqueFigs = new Set(figs)

console.log(uniqueFigs.size)
console.log(figs.length - uniqueFigs.size)