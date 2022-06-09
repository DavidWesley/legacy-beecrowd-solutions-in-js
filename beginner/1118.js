const { readFileSync } = require("fs")
const grades = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.map(Number.parseFloat)


const validateGrade = (grade = 0.0) => {
	return (0.0 <= grade && grade <= 10.0)
}


loop:
for (let i = 0; i < grades.length;) {
	let sum = 0
	let count = 0

	while (count < 2) {
		if (validateGrade(grades[i])) {
			sum += grades[i]
			count += 1
		} else {
			console.log("nota invalida")
		}

		i++
	}

	console.log("media =", (sum / 2.0).toFixed(2))

	other:
	while (count === 2) {
		console.log("novo calculo (1-sim 2-nao)")

		switch (grades[i++]) {
			case 1:
				sum = 0
				count = 0
				break other
			case 2:
				break loop
		}
	}
}
