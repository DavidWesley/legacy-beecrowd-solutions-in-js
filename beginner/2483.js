const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const repeats = Number.parseInt(input[0], 10)

console.log("Feliz nat%sl!", "a".repeat(repeats))