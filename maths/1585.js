"use strict"

const { format } = require("util")
const { readFileSync } = require("fs")
const [[numCases], ...lines] = readFileSync("/dev/stdin", "utf8").split("\n").map(line => line.split(" "))

const pandorgasArea = (d, D) => format("%d cm2", Math.trunc(d * D / 2.0))

function main() {
	const responses = lines
		.slice(0, +numCases)
		.map(([a, b]) => pandorgasArea(+a, +b))

	console.log(responses.join("\n"))
}

main()