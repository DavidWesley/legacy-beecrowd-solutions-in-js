const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map(line => line.split(" "))

/** @param {string} digits  */
function UnoNumber(digits) {
	const unoNum = [...digits].map(Number).reduce((sum, value) => value + sum, 0)

	return Math.log10(unoNum) >= 1 ? UnoNumber(`${unoNum}`) : unoNum
}

function main() {
	const responses = []

	for (const [A, B] of input) {
		if ((A === "" && B === "") || (A === "0" && B === "0")) break

		const unoA = UnoNumber(A)
		const unoB = UnoNumber(B)

		if (unoA > unoB) responses.push("1")
		else if (unoA < unoB) responses.push("2")
		else responses.push("0")
	}

	console.log(responses.join("\n"))
}

main()