const { readFileSync } = require("fs")
const [radius, availableGasVolume] = readFileSync("/dev/stdin", "utf8").split(" ").slice(0, 2).map(Number.parseFloat)

function volumeSphere(radius = 0, PI = Math.PI) {
	const volume = (4 / 3) * Math.pow(radius, 3) * PI
	return volume
}

function getFilledBaloonsQuantities(radius, gasVolume = 0) {
	return Math.floor(
		gasVolume / volumeSphere(radius, 3.1415)
	)
}

function main() {
	const filledBallons = getFilledBaloonsQuantities(radius, availableGasVolume)
	console.log(filledBallons)
}

main()