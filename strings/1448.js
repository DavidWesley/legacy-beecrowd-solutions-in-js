const { readFileSync } = require("node:fs")
const [numTestCases, ...input] = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const output = []

	for (let testCaseIndex = 0; testCaseIndex < Number.parseInt(numTestCases, 10); testCaseIndex += 1) {
		const [message = "", teamAMessage = "", teamBMessage = ""] = input.splice(0, 3)

		if (!message) break // I do not know why, but it works!

		let firstMatcherTeam = ""
		let teamAMatchesCounter = 0
		let teamBMatchesCounter = 0

		for (let index = 0; index < message.length; index += 1) {
			const char = message.charAt(index)
			teamAMatchesCounter += teamAMessage.charAt(index) === char ? 1 : 0
			teamBMatchesCounter += teamBMessage.charAt(index) === char ? 1 : 0

			if (firstMatcherTeam === "") {
				if (teamAMatchesCounter > teamBMatchesCounter) firstMatcherTeam = "time 1"
				else if (teamAMatchesCounter < teamBMatchesCounter) firstMatcherTeam = "time 2"
			}
		}

		output.push(
			`Instancia ${testCaseIndex + 1}`,
			teamAMatchesCounter !== teamBMatchesCounter
				? teamAMatchesCounter > teamBMatchesCounter ? "time 1" : "time 2"
				: (firstMatcherTeam || "empate"),
			""
		)
	}

	console.log(output.join("\n"))
}

main()
