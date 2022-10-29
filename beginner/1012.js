const Float = (num, precision) => Number.parseFloat(num.toFixed(precision))

const { readFileSync } = require("fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(Number.parseFloat)
	.map(value => Float(value, 1))

const rect = (x = 0, y = x) => x * y
const square = (l) => rect(l)
const triangle = (b, h) => (b * h) / 2
const trapeze = (b, B, h) => (B + b) * h / 2
const circle = (r, pi = Math.PI) => pi * Math.pow(r, 2)

function main() {
	const PI = Float(Math.PI, 5)

	console.log("TRIANGULO: %s", triangle(A, C).toFixed(3))
	console.log("CIRCULO: %s", circle(C, PI).toFixed(3))
	console.log("TRAPEZIO: %s", trapeze(A, B, C).toFixed(3))
	console.log("QUADRADO: %s", square(B).toFixed(3))
	console.log("RETANGULO: %s", rect(A, B).toFixed(3))
}

main()
