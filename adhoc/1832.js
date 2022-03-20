"use strict"

const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(line => line.split(" "))

const SHORT_EBCDIC_TABLE = Object.freeze({
	"064": " ",

	"129": "a",
	"130": "b",
	"131": "c",
	"132": "d",
	"133": "e",
	"134": "f",
	"135": "g",
	"136": "h",
	"137": "i",

	"145": "j",
	"146": "k",
	"147": "l",
	"148": "m",
	"149": "n",
	"150": "o",
	"151": "p",
	"152": "q",
	"153": "r",

	"162": "s",
	"163": "t",
	"164": "u",
	"165": "v",
	"166": "w",
	"167": "x",
	"168": "y",
	"169": "z",

	"192": "{",
	"193": "A",
	"194": "B",
	"195": "C",
	"196": "D",
	"197": "E",
	"198": "F",
	"199": "G",
	"200": "H",
	"201": "I",

	"208": "}",
	"209": "J",
	"210": "K",
	"211": "L",
	"212": "M",
	"213": "N",
	"214": "O",
	"215": "P",
	"216": "Q",
	"217": "R",

	"226": "S",
	"227": "T",
	"228": "U",
	"229": "V",
	"230": "W",
	"231": "X",
	"232": "Y",
	"233": "Z",

	"240": "0",
	"241": "1",
	"242": "2",
	"243": "3",
	"244": "4",
	"245": "5",
	"246": "6",
	"247": "7",
	"248": "8",
	"249": "9",
})

const ConvertBase = (num) => ({
	from: (baseFrom) => ({
		to: (baseTo) => parseInt(num, baseFrom).toString(baseTo)
	})
})

function main() {
	const responses = []

	for (const octals of input) {
		if (octals.length === 0) break

		const ASCIIChars = octals
			.map(oct => ConvertBase(oct).from(8).to(10).padStart(3, "0")) // octToDec
			.map(dec => SHORT_EBCDIC_TABLE[dec] ?? "") // DecToChar

		responses.push(ASCIIChars.join(""))
	}

	console.log(responses.join("\n"))
}

main()