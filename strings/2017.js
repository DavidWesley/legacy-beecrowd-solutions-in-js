const { readFileSync } = require("fs")
const [strX, K, ...stringsList] = readFileSync("/dev/stdin", "utf8").split("\n", 7)

function hammingDistance(strA = "", strB = strA) {
	let distance = 0
	const [longer, shorter] = strA.length >= strB.length ? [strA, strB] : [strB, strA]

	for (let index = 0; index < longer.length; index += 1)
		if (longer.charCodeAt(index) !== shorter.charCodeAt(index))
			distance += 1

	return distance
}

function main() {
	const [minimalDistance, position] = stringsList
		.map((str, index) => [hammingDistance(strX, str), index + 1])
		.sort(([distA], [distB]) => distB - distA)
		.pop()

	if (minimalDistance > Number.parseInt(K, 10)) console.log("-1")
	else console.log("%d\n%d", position, minimalDistance)
}

main()