const { readFileSync } = require("node:fs")
const [PA, PB] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 2)
	.map((value) => Number.parseInt(value, 10))

// Moon's phases
// nova -> crescente -> cheia -> minguante -> nova

if (0 <= PB && PB <= 2) console.log("nova")
else if (97 <= PB && PB <= 100) console.log("cheia")
else if (3 <= PB && PB <= 96) console.log(PA > PB ? "minguante" : "crescente")
