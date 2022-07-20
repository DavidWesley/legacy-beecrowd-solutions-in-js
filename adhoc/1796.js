const { readFileSync } = require("node:fs")

const [totalPeopleOpinions, ...opinions] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/g)
	.map((value) => Number.parseInt(value, 10))


function main() {
	let desaprovedOpinionsQuantity = 0

	for (let index = 0; index < totalPeopleOpinions; index++)
		if (opinions[index] == 1)
			desaprovedOpinionsQuantity += 1

	const percentilOfDesaprovedOpinionsQuantity = desaprovedOpinionsQuantity / totalPeopleOpinions

	console.log(percentilOfDesaprovedOpinionsQuantity < 0.5 ? "Y" : "N")
}

main()