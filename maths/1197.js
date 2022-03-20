const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const distanceTravelled = (velocity, time) => velocity * time

function main() {
	const responses = []
	const list = input.map(pair => pair.split(" ").map(int => Number.parseInt(int, 10)))

	for (const [velocity, time] of list) {
		if (isNaN(velocity) || isNaN(time)) break // EOFile Condition Verification
		const distance = distanceTravelled(velocity, time * 2)

		responses.push(distance)
	}

	console.log(responses.join("\n"))
}

main()