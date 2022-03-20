const { readFileSync } = require("fs")
const [[numCases], ...cases] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" "))

const KiloMan = {
	wasHit: function (action, shootHeight) {
		switch (action) {
			case "S": return shootHeight <= 2
			case "J": return shootHeight > 2
		}
	}
}

function main() {
	const responses = new Array(+numCases)

	for (let currCaseIndex = 0; currCaseIndex < +numCases; currCaseIndex++) {
		const from = 3 * currCaseIndex

		const [len] = cases[from]
		const [...shootings] = cases[from + 1]
		const [[...actions]] = cases[from + 2]

		let hitsCounter = 0

		for (let index = 0; index < Number.parseInt(len, 10); index++)
			if (KiloMan.wasHit(actions[index], +shootings[index]))
				hitsCounter++

		responses[currCaseIndex] = hitsCounter
	}

	console.log(responses.join("\n"))
}

main()