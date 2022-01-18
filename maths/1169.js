const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @param {number} [maxSize] */

function Power(maxSize) {
	maxSize = Math.floor(maxSize)

	const powerList = new Map([
		[0, 1n],
		[1, 2n],
		[2, 4n]
	])

	function power(base) {
		if (base === 0) return 0n
		else if (base === 1) return 1n
		else if (powerList.has(base)) return powerList.get(base)

		powerList.set(base, power(base - 1) * 2n)

		return powerList.get(base)
	}

	return function (base) {
		if (Number.isInteger(base))
			if (base >= 0 && base <= maxSize)
				return power(base)

		return
	}
}

/**
 * 12 trigos === 1 grama
 * 12.000 trigos === 1kg
 * Math.floor()
 */

/** @param {bigint | number} units */
const convertWheatUnitsToKgs = (units) => BigInt(units) / 12000n

function main() {
	const responses = []

	const numTestCases = Number.parseInt(input.shift(), 10)
	const boardHouseQuantitiesList = input.slice(0, numTestCases).map((value) => Number.parseInt(value, 10))

	const powerInstance = Power(numTestCases)

	for (const boardHouseQuant of boardHouseQuantitiesList) {
		const currentPowerNum = powerInstance(boardHouseQuant)
		const kilos = convertWheatUnitsToKgs(currentPowerNum)

		responses.push(`${kilos} kg`)
	}

	console.log(responses.join("\n"))
}

main()