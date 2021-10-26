const { readFileSync } = require("fs")
const num = +readFileSync("/dev/stdin", "utf8").split('\n')[0]

const whites = Math.ceil(Math.pow(num, 2) / 2)
const blacks = Math.floor(Math.pow(num, 2) / 2)

console.log(`${whites} casas brancas e ${blacks} casas pretas`)