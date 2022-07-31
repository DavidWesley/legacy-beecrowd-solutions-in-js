const { readFileSync } = require("fs")
const [radius, availableGasVolume] = readFileSync("/dev/stdin", "utf8").split(" ", 2).map(Number.parseFloat)

function volumeSphere(radius = 0, PI = Math.PI) {
	return (4 / 3) * Math.pow(radius, 3) * PI
}

function getFilledBaloonsQuantities(radius, gasVolume = 0) {
	return Math.floor(gasVolume / volumeSphere(radius, 3.1415))
}

const filledBallons = getFilledBaloonsQuantities(radius, availableGasVolume)
console.log(filledBallons)