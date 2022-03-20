const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(" ")

const [A, B, C] = input.map(Number.parseFloat)

const rect = (x = 0, y = x) => x * y
const square = (l) => rect(l)

const triangle = (b, h) => (b * h) / 2
const trapeze = (b, B, h) => ((B + b) * h) / 2
const circle = (r) => Number(Math.PI.toFixed(5)) * Math.pow(r, 2)

function main() {
	console.log(`TRIANGULO: ${triangle(A, C).toFixed(3)}`)
	console.log(`CIRCULO: ${circle(C).toFixed(3)}`)
	console.log(`TRAPEZIO: ${trapeze(A, B, C).toFixed(3)}`)
	console.log(`QUADRADO: ${square(B).toFixed(3)}`)
	console.log(`RETANGULO: ${rect(A, B).toFixed(3)}`)
}

main()