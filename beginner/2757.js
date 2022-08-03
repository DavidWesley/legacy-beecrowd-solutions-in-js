const { readFileSync } = require("fs")

const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 3)
	.map((num) => Number.parseInt(num, 10))

const LEN = 10

console.log("A = %d, B = %d, C = %d", A, B, C)

console.log(
	"A = %s, B = %s, C = %s",
	A.toString(10).padStart(LEN, " "),
	B.toString(10).padStart(LEN, " "),
	C.toString(10).padStart(LEN, " ")
)

console.log("A = %s, B = %s, C = %s",
	A.toString(10).padStart(LEN, "0").replace(/^(0+?)(-)/, "$2$1"),
	B.toString(10).padStart(LEN, "0").replace(/^(0+?)(-)/, "$2$1"),
	C.toString(10).padStart(LEN, "0").replace(/^(0+?)(-)/, "$2$1")
)

console.log(
	"A = %s, B = %s, C = %s",
	A.toString(10).padEnd(LEN, " "),
	B.toString(10).padEnd(LEN, " "),
	C.toString(10).padEnd(LEN, " ")
)
