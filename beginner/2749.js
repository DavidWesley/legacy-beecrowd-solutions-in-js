"use strict"

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

const ROW_SIZE = 39

const SPACE = " "
const DIV = "|"
const DASH = "-"

function main() {
	const separator = DASH.repeat(ROW_SIZE)

	const row = SPACE.repeat(ROW_SIZE)
		.pad(DIV, 0)
		.pad(DIV, -1)

	const output = [
		separator,
		row.pad("x = 35", 1),
		row,
		row.pad("x = 35", 16),
		row,
		row.pad("x = 35", 32),
		separator,
	]

	console.log(`${output.join("\n")}`)
}

if (isSuccessfullyDefined) {
	main()
}
