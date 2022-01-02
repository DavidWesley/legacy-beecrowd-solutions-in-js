const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function rlj(equation) {
	const [, R, L, J] = equation.match(/(\w+)\+(\w+)=(\w+)/)

	if (R == "R") return Number.parseInt(J, 10) - Number.parseInt(L, 10)
	if (L == "L") return Number.parseInt(J, 10) - Number.parseInt(R, 10)
	if (J == "J") return Number.parseInt(R, 10) + Number.parseInt(L, 10)
}

function main() {
	const responses = []

	for (const line of input)
		if (line === "") break
		else responses.push(rlj(line))

	console.log(responses.join("\n"))
}

main()