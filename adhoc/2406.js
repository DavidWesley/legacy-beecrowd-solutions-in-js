const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

const Expressions = {
	validate(expression = "") {
		if (expression === "") return true

		const stack = []

		for (const char of expression) {
			if (Expressions.Chain.open.includes(char))
				stack.push(char)
			else if (Expressions.Chain.close.includes(char))
				if (stack.length == 0) return false
				else if (Expressions.Chain.correct.includes(`${stack.at(-1)}${char}`)) stack.pop()
				else return false
		}

		return stack.length == 0
	},

	Chain: { open: [], close: [], correct: [], },

	set chain(/** @type {{opened: string, closed:string}} */{ opened, closed }) {
		this.Chain.open.push(opened)
		this.Chain.close.push(closed)
		this.Chain.correct.push(`${opened}${closed}`)
	}
}

Expressions.chain = { opened: "(", closed: ")" }
Expressions.chain = { opened: "{", closed: "}" }
Expressions.chain = { opened: "[", closed: "]" }

function main() {
	const responses = lines
		.slice(0, +numLines)
		.map(Expressions.validate)
		.map((b) => b ? "S" : "N")

	console.log(responses.join("\n"))
}

main()
