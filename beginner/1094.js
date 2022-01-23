const { readFileSync } = require("fs")
const [[quantity], ...lines] = readFileSync("/dev/stdin", "utf8").split("\n").map(lines => lines.split(" "))

const cobayas = Object.freeze({
	C: Object.seal({ quantity: 0, name: "coelho" }),
	R: Object.seal({ quantity: 0, name: "rato" }),
	S: Object.seal({ quantity: 0, name: "sapo" }),
})

function main() {
	for (const [index, [num, type]] of Object.entries(lines)) {
		if (index === quantity) break
		cobayas[type].quantity += Number.parseInt(num, 10)
	}

	const values = Object.values(cobayas)
	const total = values.reduce((sum, cobaya) => sum + cobaya.quantity, 0)

	const percentilsList = []
	const totalsList = [`Total: ${total} cobaias`]

	for (const { quantity, name } of values) {
		const percentil = 1e2 * (quantity / total)

		totalsList.push(`Total de ${name}s: ${quantity}`)
		percentilsList.push(`Percentual de ${name}s: ${percentil.toFixed(2)} %`)
	}

	console.log(totalsList.join("\n"))
	console.log(percentilsList.join("\n"))
}

main()