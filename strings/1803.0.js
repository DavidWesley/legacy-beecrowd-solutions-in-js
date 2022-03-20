const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const COLS = 4
const ROWS = input[0].length
// const N  = ROWS - 2

const matrings = Array.from({ length: ROWS }, () => [])

for (let row = 0; row < ROWS; row++)
	for (let col = 0; col < COLS; col++)
		matrings[row].push(input[col][row])

const nums = matrings.map(num => Number.parseInt(num.join("")))

const F = nums.shift()
const L = nums.pop()
const M = nums

const chars = M.map(m => String.fromCharCode((F * m + L) % 257))

console.log(chars.join(""))