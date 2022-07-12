/*
Crie uma variável inteira;
Crie uma variável real de simples precisão;
Crie uma variável que armazene um carácter;
Crie uma variável que armazene uma frase de no máximo 50 caracteres;
Leia todas as variáveis na ordem da forma criada;
Imprima todas as variáveis como foram lidas;
Imprima as variáveis, separando-as por uma tabulação (8 espaços), na ordem que foram lidas;
Imprima as variáveis com exatos 10 espaços.
*/

const { readFileSync } = require("node:fs")

const [input] = readFileSync("/dev/stdin", "utf-8").split("\n", 1)
const [, int, decimal, chr, str] = input.match(/(-?\d+) (-?\d+\.\d+) (.) ([\w\s]+)$/s)

function main() {
	const float = Math.fround(Number.parseFloat(decimal)).toFixed(6)
	const all = [int, float, chr, str]

	console.log(all.join(""))
	console.log(all.join("\t"))
	console.log(all.map(s => s.padStart(10, " ")).join(""))
}

main()