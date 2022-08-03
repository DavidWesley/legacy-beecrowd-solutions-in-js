const { readFileSync } = require("fs")
const [L1, L2] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map((L) => L
		.replace(/[^\d.]/g, "")
		.replace(/([.]\d{1,2})(\d*)/, "$1")
	) // sanitizing each line


const CPF = L1.substring(0, 11)

const S1 = Number(L1.substring(11, 17))
const S2 = Number(L2.substring(0, 17))

console.log("cpf", CPF)
console.log((S1 + S2).toFixed(2))