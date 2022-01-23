function main() {
	const buff = new Uint8Array(100).fill(1)
	const sum = buff.reduce((sum, one, index) => sum + one / (index + one), 0)

	console.log(sum.toFixed(2))
}

main()
