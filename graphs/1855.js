const { readFileSync } = require("fs")
const [numCols, numLines, ...map] = readFileSync("/dev/stdin", "utf8").split(/\s/g)

const Symbol = Object.freeze({
	chest: "*",
	dot: ".",
	invalid: "!",
	Directions: Object.freeze({
		up: "^",
		down: "v",
		left: "<",
		right: ">",
	}),
})

function main() {
	const flattedGraph = map.slice(0, +numLines).flatMap((line) => [...line])

	for (
		let
			plainIndex = 0,
			rowIndex = 0,
			colIndex = 0,
			currDirectionSymbol = Symbol.Directions.right;

		plainIndex < flattedGraph.length;

	) {
		plainIndex = +numCols * rowIndex + colIndex
		const char = flattedGraph[plainIndex]

		if (
			colIndex >= +numCols ||
			rowIndex >= +numLines ||
			colIndex < 0 ||
			rowIndex < 0 ||
			char == ""
		) {
			console.log(Symbol.invalid)
			break
		} else if (char == Symbol.chest) {
			console.log(Symbol.chest)
			break
		} else if (char == Symbol.dot) {
			if (currDirectionSymbol == Symbol.Directions.down) rowIndex++
			else if (currDirectionSymbol == Symbol.Directions.up) rowIndex--
			else if (currDirectionSymbol == Symbol.Directions.left) colIndex--
			else if (currDirectionSymbol == Symbol.Directions.right) colIndex++
		}

		// UPDATING DIRECTIONS
		else {
			if (char == Symbol.Directions.down) rowIndex++
			else if (char == Symbol.Directions.up) rowIndex--
			else if (char == Symbol.Directions.left) colIndex--
			else if (char == Symbol.Directions.right) colIndex++
			else break

			currDirectionSymbol = char
			flattedGraph[plainIndex] = ""
		}
	}
}

main()

// Intera sobre o array plano
// Calcula o indice a ser percorrido a partir dos lineIndex e colIndex, considerando o limite que esses valores podem ser incrementados
// Verifica o valor do caracter colocado na posição do array
// Se for o bau, quebre o loop e sinalize que achou o tesouro
// Se for um ponto, repita a operação anterior (precisa ser uma função, infelizmente)
// Se for uma mudança de direção:
// altere o currDirCode
// atualize os indices de linha e / ou coluna se necessário (isso vai ter que ser uma função)
// modifique esse char para que ele fique vazio
// Se for um caracter vazio, quebre o loop e sinalize que esse mapa está incorreto "!"
// ! Não precisa ser um função, mas o código vai ser redundante...
// Bom, depois você melhora - FEILO
