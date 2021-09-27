const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []
	const stopAtIndex = input.lastIndexOf("")

	input.slice(0, stopAtIndex).forEach((text) => {
		const isValid = parenthesesValidate(text)
		responses.push(isValid ? "correct" : "incorrect")
	})

	console.log(`${responses.join("\n")}`)
}

main()

function parenthesesValidate(ps = "") {
	const balance = {
		matches: [...(ps.match(/[\(\)]/g) || [])],
		codes: {
			opened: String.fromCharCode(40), // (
			closed: String.fromCharCode(41), // )
		},
		valid: false
	}

	const getIndexesOfSymbolsFromMatch = (symbol, symbols = []) => {
		return symbols.reduce((list, match, index) => {
			if (match[0] === symbol) list.push(index)
			return list
		}, [])
	}

	const stacks = {
		opened: getIndexesOfSymbolsFromMatch(balance.codes.opened, balance.matches),
		closed: getIndexesOfSymbolsFromMatch(balance.codes.closed, balance.matches),
	}

	balance.valid = (() => {
		const { opened, closed } = stacks
		if (opened.length !== closed.length) return false

		for (const [index, openedSymbolPosition] of Object.entries(opened))
			if (openedSymbolPosition >= closed[index]) return false

		return true
	})()

	return balance.valid
}
