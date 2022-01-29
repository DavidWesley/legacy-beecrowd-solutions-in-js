const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" "))

const Is = {
	Num: {
		Odd(num = 0) { return Math.abs(Number(num)) % 2 === 1 },
		Even(num = 1) { return Math.abs(Number(num)) % 2 === 0 },
	}
}

const ParityTranslateEnum = {
	get PAR() { return Is.Num.Even },
	get IMPAR() { return Is.Num.Odd },
}

function main() {
	const size = Number.parseInt(numCases, 10)
	const responses = Array(size)

	for (let index = 0; index < size; index++) {
		const [numA, numB] = lines[2 * index + 1]
		const [nameA, PA, nameB, PB] = lines[2 * index + 0]

		const sum = Number.parseInt(numA, 10) + Number.parseInt(numB, 10)

		if (ParityTranslateEnum[PA](sum)) responses[index] = nameA
		if (ParityTranslateEnum[PB](sum)) responses[index] = nameB

		// responses[index] = ParityTranslateEnum[PA](sum) ? nameA : nameB
	}

	console.log(responses.join("\n"))
}

main()