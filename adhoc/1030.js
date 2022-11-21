const { readFileSync } = require("node:fs")
const [[numLines], ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 31)
	.map((line) => line.split(" ", 2).map((value) => Number.parseInt(value, 10)))

const Josephus = {
	/**
	 * @param {number} n
	 * @param {number} k
	 * @returns {number}
	 */
	lastIndex(n, k) {
		if (n <= 0) return null
		else if (n == 1) return 0
		else if (k == 1) return n - 1
		else if (k == 2) return 2 * (n - 2 ** Math.floor(Math.log2(n)))
		else if (k > n) return (Josephus.lastIndex(n - 1, k) + k) % n

		let res = Josephus.lastIndex(n - Math.floor(n / k), k) - (n % k)

		if (res < 0) res += n
		else res += Math.floor(res / (k - 1))

		return Math.floor(res)
	}
}

function main() {
	const output = Array.from({ length: numLines }, (_, index) => {
		const [N, K] = input[index]
		return `Case ${index + 1}: ${Josephus.lastIndex(N, K) + 1}`
	})

	console.log(output.join("\n"))
}

main()
