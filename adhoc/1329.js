const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (let index = 0; index < input.length; index += 2) {
		const numGames = input[index]

		if (numGames == "0") break

		const scoreboard = input[index + 1].split(" ").reduce((wons, value) => {
			if (value === "0") wons.mary += 1
			else if (value === "1") wons.john += 1

			return wons
		}, { mary: 0, john: 0 })

		responses.push(
			`Mary won ${scoreboard.mary} times and John won ${scoreboard.john} times`
		)
	}

	console.log(responses.join("\n"))
}

main()