const { readFileSync } = require("fs")
const [numTestCases, ...names] = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	const namesList = names.slice(0, +numTestCases)

	const behaved = namesList.filter((name) => /^[+]/.test(name)).length
	const notBehaved = namesList.filter((name) => /^[-]/.test(name)).length

	const nameListOrdened = namesList
		.map((name) => String(name.match(/\w+/g)))
		.sort((a, b) => a.localeCompare(b))

	responses.push(
		nameListOrdened.join("\n"),
		`Se comportaram: ${behaved} | Nao se comportaram: ${notBehaved}`
	)

	console.log(responses.join("\n"))
}

main()
