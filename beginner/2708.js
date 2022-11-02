const { readFileSync } = require("node:fs")
const input = readFileSync("/dev/stdin", "utf8").split(/\s+/)

outer:
for (let index = 0, s = 0, j = 0; index < input.length; index += 2) {
	switch (input[index]) {
		case "SALIDA":
			s += Number.parseInt(input[index + 1], 10)
			j++
			break
		case "VUELTA":
			s -= Number.parseInt(input[index + 1], 10)
			j--
			break
		case "ABEND":
			console.log("%d\n%d", s, j)
			break outer
	}
}
