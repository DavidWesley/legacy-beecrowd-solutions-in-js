const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const numTestCases = input.shift()
const cases = input.map((pair) => pair.split(" "))

let results = []

for (let [index, [B, E]] of Object.entries(cases)) {
	if (numTestCases === index) break

	const min = Number.parseInt(B)
	const max = Number.parseInt(E)

	let result = ""

	for (let i = min; i <= max; i++) {
		result += i
	}

	result += [...result].reverse().join("")
	results.push(result)
}

let resp = `${results.join("\n")}`
console.log(resp)
