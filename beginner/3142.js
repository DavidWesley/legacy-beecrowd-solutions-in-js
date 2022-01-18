const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

function getEXCELColumnPositionFromName(name = "") {
	return name
		.split("")
		.reduce(
			(sum, char, index) => sum + (char.toUpperCase().charCodeAt(0) - 64) * Math.pow(26, name.length - 1 - index), 0
		)
}

const MAX_COLUMN_POSITION = getEXCELColumnPositionFromName("XFD")

function main() {
	const responses = []

	for (const colName of lines) {
		if (colName == "") break // EOF

		if (colName.length > 3)
			responses.push("Essa coluna nao existe Tobias!")
		else {
			const columnPosition = getEXCELColumnPositionFromName(colName)

			if (columnPosition <= MAX_COLUMN_POSITION) responses.push(columnPosition)
			else responses.push("Essa coluna nao existe Tobias!")
		}
	}

	console.log(responses.join("\n"))
}

main()