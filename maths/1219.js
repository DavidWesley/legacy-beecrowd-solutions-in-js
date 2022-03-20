const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

// TRIANGLES FORMULAS USING THE SIDES

const perimeter = ([...sides]) => sides.reduce((acc, cur) => acc + cur, 0)

const heronFormula = ([...sides]) => {
	const semiperimeter = perimeter(sides) / 2
	return Math.sqrt(sides.map(side => semiperimeter - side).reduce((acc, cur) => acc * cur, semiperimeter))
}

// CIRCLES FORMULAS USING THE SIDES OF AN TRIANGLE

const circleArea = (r) => Math.PI * Math.pow(r, 2)
const inradius = ([...sides]) => heronFormula(sides) / (perimeter(sides) / 2)
const circumradius = ([...sides]) => sides.reduce((acc, cur) => acc * cur, 1) / (4 * heronFormula(sides))

function areaOfFlowers([...sides]) {
	const triangleAreaFromSides = heronFormula(sides)

	const sunflowers = circleArea(circumradius(sides)) - triangleAreaFromSides
	const roses = circleArea(inradius(sides))
	const violets = triangleAreaFromSides - roses

	return [sunflowers, violets, roses]
}

function main() {
	const responses = []

	const sidesList = input.map(sides => sides.split(" ").map(size => Number.parseInt(size, 10)))

	for (const sides of sidesList) {
		if (sides.some(Number.isNaN)) break// EOFile Condition Verification
		const areas = areaOfFlowers(sides).map(area => area.toFixed(4))

		responses.push(areas.join(" "))
	}

	console.log(responses.join("\n"))
}

main()