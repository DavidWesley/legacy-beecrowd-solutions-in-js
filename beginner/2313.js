const { readFileSync } = require("node:fs")
const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map(value => Number.parseInt(value, 10))


const Triangle = {
	isTriangle(a, b, c) {
		const sides = [a, b, c].sort((a, b) => a - b)

		if (sides.some(side => side <= 0)) return false
		else if (sides[0] + sides[1] <= sides[2]) return false
		else return true
	},

	isPitagoric(/** @type {[number, number, number]}*/[a, b, c]) {
		return (a * a + b * b) == c * c || (a * a + c * c) == b * b || (b * b + c * c) == a * a
	},

	getTriangleTypesFromSides(sides = [0, 0, 0]) {
		const [a, b, c] = sides.sort((a, b) => b - a)

		if (sides.every(s => s === a)) return "EQUILATERO"
		else if (a == b || a == c || b == c) return "ISOSCELES"
		else return "ESCALENO"
	},

	getTriangleTypesFromAngles(sides = [0, 0, 0]) {
		const [a, b, c] = sides.sort((a, b) => b - a)

		if (Math.pow(a, 2) == Math.pow(b, 2) + Math.pow(c, 2)) return "RETANGULO"
		else if (Math.pow(a, 2) > Math.pow(b, 2) + Math.pow(c, 2)) return "OBTUSANGULO"
		else if (Math.pow(a, 2) < Math.pow(b, 2) + Math.pow(c, 2)) return "ACUTANGULO"
	}
}


function main() {
	const output = []
	const sides = [A, B, C]

	if (Triangle.isTriangle(...sides)) {
		switch (Triangle.getTriangleTypesFromSides(sides)) {
			case "EQUILATERO": output.push("Valido-Equilatero"); break
			case "ESCALENO": output.push("Valido-Escaleno"); break
			case "ISOSCELES": output.push("Valido-Isoceles"); break // "Isoceles" KKKKKKKKKKKKKKKK
		}
		output.push(`Retangulo: ${Triangle.isPitagoric(sides) ? "S" : "N"}`)
	}
	else
		output.push("Invalido")

	console.log(output.join("\n"))
}

main()
