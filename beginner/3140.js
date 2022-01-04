const { createReadStream } = require("fs")
const { createInterface } = require("readline")

const PATH = "/dev/stdin"
const ENCODING = "ascii"


/**
 * @param {string} path
 * @param {BufferEncoding} encoding
 */

function processLineByLine(path, encoding) {
	let innerHTMLBody = false

	const rl = createInterface({
		input: createReadStream(path, encoding),
		crlfDelay: Infinity,
		terminal: false
	})

	// Prevent EOFile
	rl.on("line", (line) => {
		if (line.includes("<body>")) innerHTMLBody = true
		if (line.includes("</body>")) innerHTMLBody = false

		if (innerHTMLBody === true && line.includes("<body>") === false)
			console.log(line)
	})
}

processLineByLine(PATH, ENCODING)