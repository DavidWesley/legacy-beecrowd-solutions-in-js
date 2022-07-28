const { readFileSync } = require("node:fs")
const [B, G] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(value => Number.parseInt(value, 10))

const D = Math.floor(G / 2) - B

console.log(D <= 0 ? "Amelia tem todas bolinhas!" : `Faltam ${D} bolinha(s)`)