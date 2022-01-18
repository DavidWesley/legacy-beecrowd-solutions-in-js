const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n").map((line) => line.split(" "))

// Generator here is better than arr.shift() method
// decreasing complexity from O(n * n) to O(n)
const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)


const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => Number.parseInt(num, baseFrom).toString(baseTo),
	}),
})

class Bin {
	#list

	constructor(num = 0, from = 10, nBits = 32) {
		this.#list = ConvertBase(num).from(from).to(2).padStart(nBits, "0").split("")
	}

	get bits() {
		return this.#list.join("")
	}

	swap(indexA, indexB) {
		const len = this.#list.length

		const posA = len - (indexA + 1)
		const posB = len - (indexB + 1)

		if (posA < len && posA >= 0 && posB < len && posB >= 0) {
			const bitA = this.#list[posA]
			const bitB = this.#list[posB]

			this.#list[posA] = bitB
			this.#list[posB] = bitA
		}
	}
}

function main() {
	const responses = []

	for (let curr = input.next(); curr.done == false; curr = input.next()) {
		if (curr.value.includes("0")) break // End of input

		const [originalNumber, permutations] = curr.value
		const bin = new Bin(+originalNumber)

		let res = 0
		let max = Number.parseInt(bin.bits, 2)
		let min = max

		for (let permu = 0; permu < +permutations; permu++) {
			const [indexA, indexB] = input.next().value

			bin.swap(+indexA, +indexB)
			res = Number.parseInt(bin.bits, 2)

			if (res > max) max = res
			if (res < min) min = res
		}

		responses.push(`${res} ${max} ${min}`)
	}

	console.log(responses.join("\n"))
}

main()