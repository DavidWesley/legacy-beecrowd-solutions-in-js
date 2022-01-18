const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n").map((line) => line.split(" "))

/**
 * @param {string | any[]} arr
 * @param {number} pos
 */
const at = (arr, pos) => arr[(arr.length + pos) % arr.length]

/** @param {number[]} nums  */
function countInflections(nums) {
	if (nums.length <= 1) return nums.length

	let count = 0
	let prevInflectionPoint = at(nums, -1)

	nums.forEach((curr, index, arr) => {
		const next = at(arr, index + 1)
		// Ambos estão descendo ou subindo:
		// 9 -> DESCEU -> 6 -> DESCEU -> 5
		// PREV ->     CURR ->         NEXT

		// INFLECÇÃO:
		// 9 -> DESCEU -> 5 -> SUBIU  -> 10
		// PREV ->     CURR ->         NEXT
		// prevInflectionPoint = curr

		// CURR === NEXT  <=>  Não faz nada
		// 5 -> DESCEU -> 10 -> IGUA  -> 10
		// PREV ->     CURR ->         NEXT
		if (curr !== next) {
			if (Math.sign(curr - prevInflectionPoint) != Math.sign(next - curr)) {
				count += 1
				prevInflectionPoint = curr
			}
		}
	})

	return count
}

function main() {
	const responses = []

	for (let index = 0; index < input.length; index += 2) {
		const [N] = input[index]
		if (N == "0") break

		const nums = input[index + 1].slice(0, +N).map((n) => Number.parseInt(n, 10))
		responses.push(countInflections(nums))
	}

	console.log(responses.join("\n"))
}

main()