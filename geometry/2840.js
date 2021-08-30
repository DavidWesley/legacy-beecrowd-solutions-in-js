const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split(' ')

function volumeSphere(radius = 0) {
	const PI = 3.1415
	const volume = (4 / 3) * Math.pow(radius, 3) * PI

	return volume
}

function getFilledBaloonsQuantities(radius, gasVolume = 0) {
	return Math.floor(
		gasVolume / volumeSphere(radius)
	)
}

function main() {
	const [radius, availableGasVolume] = input.slice(0, 2).map(Number.parseFloat)
	const filledBallons = getFilledBaloonsQuantities(radius, availableGasVolume)

	console.log(`${filledBallons}`)
}

main()