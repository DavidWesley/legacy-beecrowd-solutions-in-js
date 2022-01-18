const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const angle of input) {
		if (angle == "") break // EOF
		const A = Number.parseFloat(angle)

		if (A < 0 || A > 180) break
		else if (A % 6 == 0) responses.push("Y")
		else responses.push("N")
	}

	console.log(responses.join("\n"))
}

main()