const { readFileSync } = require("node:fs")
const [numTestCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const output = []

	for (let testCaseIndex = 0; testCaseIndex < Number.parseInt(numTestCases, 10); testCaseIndex += 1) {
		let isCheater = false
		const from = 3 * testCaseIndex
		const foods = new Set(input[from + 0])

		const lunchA = input[from + 1]
		const lunchB = input[from + 2]

		for (const food of [...lunchA, ...lunchB]) {
			if (food === "") continue
			if (foods.has(food)) { foods.delete(food) }
			else { isCheater = true; break }
		}

		output.push(
			isCheater ?
				"CHEATER" :
				Array
					.from(foods.values())
					.sort((fA, fB) => fA.localeCompare(fB, "en-US"))
					.join("")
		)
	}

	console.log(output.join("\n"))
}

main()
