const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8")

function indentStrLikeCppCode(code, indent_size = 4) {
	let deep = 0
	const indent = (times) => " ".repeat(indent_size).repeat(times)

	return code
		.replace(/[{};]/gs, (match) => {
			if (match === "{") { deep += 1; return "\n" + indent(deep - 1) + match + "\n" + indent(deep) }
			else if (match === "}") { if (deep > 0) deep -= 1; return match + "\n" + indent(deep) }
			else if (match === ";") { return match + "\n" + indent(deep) }
			else { return indent(deep) + match }
		})
		.replace(RegExp(`${indent(1)}}`, "gm"), "}")
		.replace(/for.+?(?=\s+\{)/gs, (match) => { return match.replace(/\s/g, "") })
		.trimEnd()
}

const SIZE = 4

console.log(
	indentStrLikeCppCode(input, SIZE).replace(RegExp(`^( {${SIZE}})+`, "gm"), (m) => ".".repeat(m.length))
)
