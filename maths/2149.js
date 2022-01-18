const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @type { Map<number, bigint> } */
const TioPhillBonatiMap = new Map()

TioPhillBonatiMap.set(0, 0n)
TioPhillBonatiMap.set(1, 1n)
TioPhillBonatiMap.set(2, 1n)

/** @param { number | string } num */
const isOdd = (num) => Math.abs(Number(num)) % 2 === 1

function TioPhillBonati(nth = 0) {
	if (nth <= 0) return TioPhillBonatiMap.get(0)

	if (TioPhillBonatiMap.has(nth) == false) {
		const philA = TioPhillBonati(nth - 1)
		const philB = TioPhillBonati(nth - 2)

		TioPhillBonatiMap.set(nth, isOdd(nth) ? philA * philB : philA + philB)
	}

	return TioPhillBonatiMap.get(nth)
}

function main() {
	const responses = []

	for (const line of input)
		if (line == "") break // EOFile
		else responses.push(TioPhillBonati(Number.parseInt(line, 10) - 1))

	console.log(responses.join("\n"))
}

main()