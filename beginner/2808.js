const { readFileSync } = require("node:fs")
const [from, to] = readFileSync("/dev/stdin", "utf-8").split(" ", 2)

/**
 * @param {string} posA
 * @param {string} posB
 */
function validateChessKnightMovements(posA, posB) {
	const [colA, lnA] = posA.toUpperCase().split("", 2)
	const [colB, lnB] = posB.toUpperCase().split("", 2)

	const dx = Math.abs(colA.charCodeAt(0) - colB.charCodeAt(0))
	const dy = Math.abs(lnA.charCodeAt(0) - lnB.charCodeAt(0))

	return ((dx == 1 && dy == 2) || (dx == 2 && dy == 1))
}

console.log(validateChessKnightMovements(from, to) ? "VALIDO" : "INVALIDO")
