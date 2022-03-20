const { readFileSync } = require("fs")
const [keyPhrase, text] = readFileSync("/dev/stdin", "utf8").split("\n")

function chunkArray(myArray = [], chunkSize = myArray.length) {
	const results = []
	while (myArray.length > 0) results.push(myArray.splice(0, chunkSize))

	return results
}

function PlayfairCypher(keyPhrase) {
	const formmatString = (str = "") => str.replaceAll(/[ ]/, "").toUpperCase()

	const upperAlphabet = "ABCDEFGHIJKLMNOPRSTUVWXYZ" //Except "Q"
	const keys = formmatString(keyPhrase).concat(upperAlphabet)

	const cypher = Object.freeze(chunkArray([...new Set(keys)], 5))
	const cypherTable = generatePlayfairCypherTable()

	function generatePlayfairCypherTable() {
		const cypherTable = Object.freeze(
			Object.fromEntries(
				cypher.flatMap((row, rowIndex) => {
					return row.map((char, colIndex) => {
						return [String(char), { row: rowIndex, column: colIndex }]
					})
				})
			)
		)

		return cypherTable
	}

	function getDigraphsFromText(text) {
		const digraphs = []
		const charsList = [...formmatString(text)]

		while (charsList.length > 0) {
			let [firstChar, secondChar = undefined] = charsList.splice(0, 2)

			if (secondChar === undefined) {
				secondChar = "X"
			} else if (firstChar === secondChar) {
				charsList.unshift(secondChar)
				secondChar = "X"
			}

			digraphs.push([firstChar, secondChar])
		}

		return Object.freeze(digraphs)
	}

	function encryptText(/** @type {string} */ text) {
		const digraphs = getDigraphsFromText(text)

		return digraphs.reduce((encrypted, [first, second]) => {
			const f = cypherTable[first]
			const s = cypherTable[second]

			let toReplaceFChar = ""
			let toReplaceSChar = ""

			if (f.row === s.row) {
				// Mesma linha
				toReplaceFChar = cypher[f.row][(f.column + 1) % cypher.length]
				toReplaceSChar = cypher[s.row][(s.column + 1) % cypher.length]

			} else if (f.column === s.column) {
				// Mesma coluna
				toReplaceFChar = cypher[(f.row + 1) % cypher.length][f.column]
				toReplaceSChar = cypher[(s.row + 1) % cypher.length][s.column]

			} else {
				// Linhas e colunas diferentes
				toReplaceFChar = cypher[f.row][s.column]
				toReplaceSChar = cypher[s.row][f.column]
			}

			return encrypted.concat(`${toReplaceFChar}${toReplaceSChar}`)
		}, "")
	}

	return {
		getDigraphsFromText,
		encryptText,
		cypherTable,
		cypher,
	}
}

function main() {
	const playfairCypher = PlayfairCypher(keyPhrase) // cria a cifra e armazena
	const encryptedText = playfairCypher.encryptText(text) // encripta o texto inserido

	console.log(encryptedText)
}

main()
