const { readFileSync } = require("node:fs")

const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" "))

function main() {
	const output = []

	for (let i = 1; input.length > 0; i += 1) {
		const [queriedShoesNumber] = input.shift()
		if (queriedShoesNumber === "") break
		const shoesList = input.shift()

		const shoes = {
			F: new Map(),
			M: new Map(),
		}

		while (shoesList.length) {
			const [num, gender] = shoesList.splice(0, 2)

			switch (gender) {
				case "F": shoes.F.set(num, (shoes.F.get(num) || 0) + 1); break
				case "M": shoes.M.set(num, (shoes.M.get(num) || 0) + 1); break
			}
		}

		const totalFemalesQueriedShoes = shoes.F.get(queriedShoesNumber) || 0
		const totalMalesQueriedShoes = shoes.M.get(queriedShoesNumber) || 0

		output.push(
			`Caso ${i}:`,
			`Pares Iguais: ${totalFemalesQueriedShoes + totalMalesQueriedShoes}`,
			`F: ${totalFemalesQueriedShoes}`,
			`M: ${totalMalesQueriedShoes}`,
			""
		)
	}

	output.pop() // Removing last blank line to prevent presentation error
	console.log(output.join("\n"))
}

main()
