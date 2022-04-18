const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")[0]

const splitCPFCode = (cpf = "") => cpf.split(/[-.]/)

function main() {
	const splitedCPFCode = splitCPFCode(input)
	console.log(splitedCPFCode.join("\n"))
}

main()