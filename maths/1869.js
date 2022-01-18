const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => parseInt(num, baseFrom).toString(baseTo),
	}),
})

function main() {
	const responses = []

	for (const num of input) {
		const base32 = ConvertBase(num).from(10).to(32).toUpperCase()
		responses.push(base32)

		if (num === "0") break // EOFile Condition Verification
	}

	console.log(responses.join("\n"))
}

main()
