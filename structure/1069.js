const { readFileSync } = require('fs')
const [numCases, ...cases] = readFileSync("/dev/stdin", "utf8").split('\n')

function main() {
	const responses = cases.slice(0, +numCases).map((_, index) => {
		const sign = [...cases[index]]
		const foundedDiamonds = findDiamonds(sign)

		return foundedDiamonds
	})

	console.log(responses.join("\n"))
}

main()

/** @param {string[]} sign */

function findDiamonds(sign = []) {
	const signs = {
		sign: sign,
		stacks: {
			LTS: [],
			GTS: []
		},
		codes: {
			LTS: String.fromCharCode(60), // <
			GTS: String.fromCharCode(62) // >
		},
		diamonds: {
			counter: 0
		}
	}

	signs.sign.forEach((symbol, index) => {
		if (symbol === signs.codes.LTS)
			signs.stacks.LTS.push(index)
		else if (symbol === signs.codes.GTS) {
			signs.stacks.GTS.push(index)

			if (signs.stacks.LTS.length > 0) {
				signs.stacks.LTS.pop()
				++signs.diamonds.counter
			}
		}
	})

	return signs.diamonds.counter
}