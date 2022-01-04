const input = require("fs").readFileSync("/dev/stdin", "utf8")
const [D1, D2] = input.split(" ").map(door => Number.parseInt(door, 10))

function ways(d1 = 0, d2 = 0) {
	if (d1 === 0) return "C"
	else if (d2 === 0) return "B"
	else return "A"
}

console.log(ways(D1, D2))