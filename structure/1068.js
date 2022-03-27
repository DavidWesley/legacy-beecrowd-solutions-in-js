const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

function main() {
	const responses = []

	for (const text of input) {
		if (text == "") break
		const isValid = parenthesesValidate(text)

		responses.push(isValid ? "correct" : "incorrect")
	}

	console.log(responses.join("\n"))
}

main()

function parenthesesValidate(ps = "") {
	const balance = {
		matches: [...(ps.match(/[()]/g) || [])],
		codes: {
			opened: String.fromCharCode(40), // (
			closed: String.fromCharCode(41), // )
		},
		valid: false
	}

	function getIndexesOfSymbolsFromMatch(symbol, symbols = []) {
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
		if (stacks.opened.length !== stacks.closed.length)
			return false

		for (const [index, openedSymbolPosition] of Object.entries(stacks.opened))
			if (openedSymbolPosition >= stacks.closed[index]) return false

		return true
	})()

	return balance.valid
}