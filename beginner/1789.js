const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")


function slugLevel(velocity) {
	if (velocity < 10) return 1
	else if (velocity >= 10 && velocity < 20) return 2
	else return 3
}

function main() {
	const responses = []

	for (let i = 0; i < lines.length; i += 2) {
		if (lines[i] == "") break

		const numSlugs = Number.parseInt(lines[i], 10)
		const slugs = lines[i + 1]
			.split(" ", numSlugs)
			.map((value) => Number.parseInt(value, 10))

		const fasterSlug = Math.max.apply(null, slugs)

		responses.push(slugLevel(fasterSlug))
	}

	console.log(responses.join("\n"))
}

main()