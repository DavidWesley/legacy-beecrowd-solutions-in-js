const { readFileSync } = require("fs")
const [numTestCases, ...cases] = readFileSync("/dev/stdin", "utf8").split("\n")

Reflect.setPrototypeOf(Math, {
	gcf: ([x, y]) => {
		if (isNaN(x) || isNaN(y)) return
		x = Math.abs(x), y = Math.abs(y)
		while (y) [x, y] = [y, x % y]
		return x
	}
})

function main() {
	const figurinesPairList = cases
		.slice(0, +numTestCases)
		.map((figurinesPair) =>
			figurinesPair.split(" ").map((num) => Number.parseInt(num, 10))
		)

	const responses = figurinesPairList.map(Math.gcf)

	console.log(`${responses.join("\n")}`)
}

main()