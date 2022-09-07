const { readFileSync } = require("fs")

const [result, bet] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((line) => line.split(" ", 6).map(value => Number.parseInt(value, 10)))


function main() {
	const correctNumbersIntoBetQuantity = bet
		.filter((value) => result.includes(value))
		.length

	switch (correctNumbersIntoBetQuantity) {
		case 6: console.log("sena"); break
		case 5: console.log("quina"); break
		case 4: console.log("quadra"); break
		case 3: console.log("terno"); break
		default: console.log("azar"); break
	}
}

main()