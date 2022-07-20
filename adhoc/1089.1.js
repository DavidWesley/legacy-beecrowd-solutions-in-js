const { readFileSync } = require("fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line
		.split(" ")
		.map(value => Number.parseInt(value, 10))
	)

/** @param {number[]} nums  */

function countInflections(nums) {
	if (nums.length <= 1) return nums.length

	let count = 0
	let prevInflectionPoint = nums.at(-1)

	nums.forEach((curr, index, arr) => {
		const next = arr.at(index + 1)

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

		if (N === 0)
			break

		responses.push(
			countInflections(input[index + 1].slice(0, N))
		)
	}

	console.log(responses.join("\n"))
}

main()