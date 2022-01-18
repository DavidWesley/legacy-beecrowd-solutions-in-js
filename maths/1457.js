const { readFileSync } = require("fs")
const [numLines, ...lines] = readFileSync("/dev/stdin", "utf8").split("\n")

function kFactorial(kNum) {
	const [, num = "0", K = "!"] = kNum.match(/(\d+)(!+)/)
	for (var k = +num, res = 1n; k > 0; k -= K.length) res *= BigInt(k)
	return res
}

function main() {
	const responses = lines.slice(0, +numLines).map(kFactorial)
	console.log(responses.join("\n"))
}

main()