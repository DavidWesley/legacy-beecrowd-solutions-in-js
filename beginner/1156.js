function main() {
	let sum = 0

	for (let i = 1, exponent = 0; i < 39; i += 2, exponent++)
		sum += i / Math.pow(2, exponent)

	console.log(sum.toFixed(2))
}

main()
