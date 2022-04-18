const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.trimEnd() // Remove last line to pass in Debug
	.split("\n")


function RunLengthEncoding(text) {
	return text
		.replace(/(.)\1{1,8}/g, (match) => `[${match.length}#${match.charAt(0)}]`)
		.replace(/(?<=^|\])(?<![2-9]#)[a-zA-Z0-9 \-.,:;?!]+(?=(\[|$))/gm, (match) => `1${match.replace(/1/g, "11")}1`)
		.replace(/[[\]#]/g, "")
}

function main() {
	for (const line of input)
		console.log(RunLengthEncoding(line))
}

main()