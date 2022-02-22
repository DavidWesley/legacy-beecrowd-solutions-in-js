const { readFileSync } = require("fs")
const [[numLines], ...lines] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map((line) => line.split(" ").map(Number.parseFloat))

function main() {
	const [[id, grade]] = lines
		.slice(0, numLines)
		.sort(([, gradeA], [, gradeB]) => gradeB - gradeA)

	if (grade < 8.0)
		console.log("Minimum note not reached")
	else
		console.log(id)
}

main()