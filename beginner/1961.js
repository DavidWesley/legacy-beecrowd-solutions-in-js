const { readFileSync } = require("fs")

const [P, N, ...heigths] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map((value) => Number.parseInt(value))

function main() {
	let canJumpAllHeigths = true

	for (let i = 1; i < N; i++) {
		if (canJumpAllHeigths === false) break
		if (Math.abs(heigths[i] - heigths[i - 1]) > P) canJumpAllHeigths = false
	}

	console.log(canJumpAllHeigths ? "YOU WIN" : "GAME OVER")
}

main()