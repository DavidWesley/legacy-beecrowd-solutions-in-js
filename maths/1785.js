const { readFileSync } = require("fs")

const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => Number.parseInt(line, 10))

function krapekar(x) {
	let count = 0

	while (x != 6174 && x != 0 && count < 8) {
		const maior = maior_numero_com_digitos_de(x)
		const menor = menor_numero_com_digitos_de(x)

		x = maior - menor
		count += 1
	}

	return x === 0 ? -1 : count
}

function menor_numero_com_digitos_de(x) {
	const str = x
		.toString(10)
		.padEnd(4, "0")
		.split("")
		.map(Number)
		.sort((a, b) => a - b) // ascending order
		.join("")

	return Number.parseInt(str, 10)
}

function maior_numero_com_digitos_de(x) {
	const str = x
		.toString(10)
		.padEnd(4, "0")
		.split("")
		.map(Number)
		.sort((a, b) => b - a) // descendind order
		.join("")

	return Number.parseInt(str, 10)
}


function main() {
	const responses = lines
		.slice(0, numLines)
		.map((line, index) => {
			return `Caso #${index + 1}: ${krapekar(line)}`
		})

	console.log(responses.join("\n"))
}

main()