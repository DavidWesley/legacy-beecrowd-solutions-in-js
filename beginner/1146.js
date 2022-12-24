const { readFileSync } = require("node:fs");
const input = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(value => Number.parseInt(value, 10));

function main() {
	const output = [];

	for (const size of input)
		if (size === 0) break;
		else output.push(Array.from({ length: size }, (_, i) => i + 1).join(" "));

	console.log(output.join("\n"));
}

main();
