const { readFileSync } = require("fs")
const [A, B] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map(value => Number.parseInt(value, 10))

function main() {
	let [quoc, rest] = [Math.trunc(A / B), A % B]

	if (A < 0) {
		for (rest = 0; rest < Math.abs(B); rest += 1) if ((A - rest) % B == 0) break
		quoc = (A - rest) / B
	}

	console.log("%s %s", quoc.toString(10), rest.toString(10))
}

main()