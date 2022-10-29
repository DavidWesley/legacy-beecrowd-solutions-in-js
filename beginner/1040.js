const { readFileSync } = require("node:fs")
const [N1, N2, N3, N4, N5 = 0] = readFileSync("/dev/stdin", "utf8")
	.split(/\s+/, 5)
	.map(Number.parseFloat)

/**
 * @param {number} A note A's value
 * @param {number} B note B's value
 * @param {number} C note C's value
 * @param {number} D note D's value
 */
const calculateStudentAverageGrade = (A, B, C, D) => (A * 2.0 + B * 3.0 + C * 4.0 + D * 1.0) / 10.0

function main() {
	const grade = calculateStudentAverageGrade(N1, N2, N3, N4)
	console.log("Media: %s", grade.toFixed(1))

	if (grade >= 7.0) { console.log("Aluno aprovado.") }
	else if (grade >= 5.0) {
		const average = (N5 + grade) / 2
		console.log("Aluno em exame.")
		console.log("Nota do exame: %s", N5.toFixed(1))
		console.log(average >= 5.0 ? "Aluno aprovado." : "Aluno reprovado.")
		console.log("Media final: %s", average.toFixed(1))
	}
	else { console.log("Aluno reprovado.") }
}

main()
