const { readFileSync } = require("node:fs")
const [N, ...input] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 1 + 1e4)
	.map(value => Number.parseInt(value, 10))

const candidates = input.splice(0, N)
const mostVotedCandidate = Math.max.apply(null, candidates)

console.log(
	candidates.findIndex((candidate) => candidate === mostVotedCandidate) === 0
		? "S"
		: "N"
)
