const { readFileSync } = require("fs")
const [N, bitsA, bitsB] = readFileSync("/dev/stdin", "utf8").split("\n", 3)

const isOdd = (num) => Math.abs(Number(num)) % 2 === 1
const isEven = (num) => Math.abs(Number(num)) % 2 === 0

const Bit = Object.freeze({
	flip(bits = "", n = bits.length) {
		return bits
			.substring(0, n)
			.replace(/0|1/g, (m) => m == "0" ? "1" : "0")
			.concat(bits.substring(n))
	}
})

function main() {
	if ((isOdd(N) && bitsA === Bit.flip(bitsB)) || (isEven(N) && bitsA === bitsB)) console.log("Deletion succeeded")
	else console.log("Deletion failed")
}

main()