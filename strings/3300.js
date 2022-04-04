const { readFileSync } = require("fs")
const [N] = readFileSync("/dev/stdin", "utf8").split("\n")

console.log(N, /13/.test(N) ? "es de Mala Suerte" : "NO es de Mala Suerte")
