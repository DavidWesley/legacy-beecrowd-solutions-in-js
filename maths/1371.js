const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function Doors(doorsList = []) {
	const numSquares = []
	const maxNumDoors = Math.max.apply(null, doorsList)

	for (let i = 0, u = 1; i + u <= maxNumDoors; u += 2) {
		i += u
		numSquares.push(i)
	}

	return function openedDoors(doors) {
		const squareLimitValue = Math.pow(Math.floor(Math.sqrt(doors)), 2)
		const numSquareFinalIndex = numSquares.indexOf(squareLimitValue) + 1

		return numSquares.slice(0, numSquareFinalIndex)
	}
}

function main() {
	const brokenAtIndex = input.indexOf("0")
	const doorsList = input.slice(0, brokenAtIndex).map(doors => Number.parseInt(doors, 10))

	const openedDoors = Doors(doorsList)
	const responses = doorsList.map(doors => openedDoors(doors).join(" "))

	console.log(responses.join("\n"))
}

main()