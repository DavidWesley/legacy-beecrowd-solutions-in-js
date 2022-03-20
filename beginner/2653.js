const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const countUniqueElements = ([...elements]) => new Set(elements).size
const Dijkstra = ([...jewelriesList]) => countUniqueElements(jewelriesList)


function main() {
	const jewelriesList = []

	for (const jewelry of input)
		if (jewelry == "") break // EOFile Condition
		else jewelriesList.push(jewelry)

	console.log(Dijkstra(jewelriesList))
}

main()