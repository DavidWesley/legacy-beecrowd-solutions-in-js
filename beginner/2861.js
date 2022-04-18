const { readFileSync } = require("fs")
const [numQuestions] = readFileSync("/dev/stdin", "utf8").split("\n")

const output = new Array(Number.parseInt(numQuestions, 10)).fill("gzuz")

console.log(output.join("\n"))
