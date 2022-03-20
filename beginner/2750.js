const isSuccessfullyDefined = Reflect.defineProperty(String.prototype, "pad", {
	value(pad, from = 0) {
		const splited = [...this]
		splited.splice(from, pad.length, ...pad)
		return splited.join("").substr(0, this.length)
	},
	writable: false,
	configurable: false,
	enumerable: true,
})

const UNTIL = 15
const ROW_SIZE = 39

const SPACE = " "
const DIV = "|"
const DASH = "-"

function main() {
	const separator = DASH.repeat(ROW_SIZE) // 	"---------------------------------------"

	const row = SPACE.repeat(ROW_SIZE) 			//	"|           |         |               |"
		.pad(DIV, 0)
		.pad(DIV, 12)
		.pad(DIV, 22)
		.pad(DIV, -1)

	const label = row 				//		"|  decimal  |  octal  |  Hexadecimal  |"
		.pad("decimal", 3)
		.pad("octal", 15)
		.pad("Hexadecimal", 25)

	const output = [
		separator,
		label,
		separator
	]

	for (let num = 0; num <= UNTIL; num++) {
		const dec = num.toString(10).toUpperCase()
		const oct = num.toString(8).toUpperCase()
		const hex = num.toString(16).toUpperCase()

		const currentRow = row
			.pad(dec, 8 - dec.length)
			.pad(oct, 18 - oct.length)
			.pad(hex, 31 - hex.length)

		output.push(currentRow)
	}

	console.log(output.concat(separator).join("\n"))
}

if (isSuccessfullyDefined) {
	main()
}