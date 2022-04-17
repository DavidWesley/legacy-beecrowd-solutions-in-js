const { readFileSync } = require("fs")
const [position] = readFileSync("/dev/stdin", "utf8").split("\n")

const TOPS = [1, 3, 5, 10, 25, 50, 100]

function main() {
	const topList = TOPS.find(top => top >= +position)
	console.log("Top", topList)
}

main()