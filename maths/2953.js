const { readFileSync } = require("node:fs")
const [N] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1)
	.map(value => Number.parseInt(value, 10))

function main() {
	const MOD = 1e9 + 7
	let [A, B, C] = [0, 0, 1]

	for (let i = 1; i < N; i++)
		[A, B, C] = [B, C, ((A + B) % MOD) % MOD]

	console.log(C)
}

main()
