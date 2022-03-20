const { readFileSync } = require("fs")
let num = Number.parseInt(readFileSync("/dev/stdin", "utf8").split("\n").shift(), 10)

const isOdd = (num = 0) => Math.abs(Number(num)) % 2 === 1

function main() {
	const responses = []

	const limitLoop = 6
	const initialValue = isOdd(num) ? num : ++num

	for (let loop = 0; loop < limitLoop; loop++)
		responses.push(initialValue + loop * 2)

	console.log(responses.join("\n"))
}

main()