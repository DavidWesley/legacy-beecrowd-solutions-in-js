const { readFileSync } = require("node:fs")
const [DD, MM, AA] = readFileSync("/dev/stdin", "utf8")
	.trimEnd()
	.split("/", 3)

console.log(`${MM}/${DD}/${AA}`) //  MM/DD/AA
console.log(`${AA}/${MM}/${DD}`) //  AA/MM/DD
console.log(`${DD}-${MM}-${AA}`) //  DD-MM-AA
