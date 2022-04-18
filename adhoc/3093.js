const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")


function main() {
	const responses = lines
		.slice(0, Number.parseInt(numLines, 10))
		.map((deck) => {
			return ["Q", "J", "K", "A"].every((card) => deck.includes(card))
				? "Aaah muleke"
				: "Ooo raca viu"
		})

	console.log(responses.join("\n"))
}

main()
