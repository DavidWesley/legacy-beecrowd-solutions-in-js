const { readFileSync } = require("fs")
const [fruitsQuantity, textQuantity, ...lines] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/)
	.map((str) => str.toLowerCase())

const reverseString = (str = "") => [...str].reverse().join("")

function main() {
	const fruitSize = Number.parseInt(fruitsQuantity, 10)
	const textSize = Number.parseInt(textQuantity, 10)

	const fruits = lines.slice(0, fruitSize)
	const contents = lines.slice(fruitSize, fruitSize + textSize)

	const result = fruits.map((fruit) => {
		const has = contents.some((line) => {
			return line.includes(fruit) || line.includes(reverseString(fruit))
		})

		return `Sheldon ${has ? "come" : "detesta"} a fruta ${fruit}`
	})

	console.log(result.join("\n"))
}

main()
