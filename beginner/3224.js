const { readFileSync } = require("node:fs")
const [ahJon, ahDoctor] = readFileSync("/dev/stdin", "utf8").split("\n", 2)

console.log((ahJon.length >= ahDoctor.length) ? "go" : "no")
