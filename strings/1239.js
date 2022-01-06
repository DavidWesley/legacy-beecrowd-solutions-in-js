const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").trimEnd() // Prevent the EOF

const ShortcutsBloggo = {
	HTMLTags: {
		bold: "*",
		italics: "_"
	}
}

function main() {
	const chars = []

	let isClosedBoldTag = true
	let isClosedItalicsTag = true

	for (const char of input) {
		switch (char) {
			case ShortcutsBloggo.HTMLTags.bold:
				chars.push(isClosedBoldTag ? "<b>" : "</b>")
				isClosedBoldTag = !isClosedBoldTag
				break
			case ShortcutsBloggo.HTMLTags.italics:
				chars.push(isClosedItalicsTag ? "<i>" : "</i>")
				isClosedItalicsTag = !isClosedItalicsTag
				break
			default:
				chars.push(char)
		}
	}

	console.log(chars.join(""))
}

main()