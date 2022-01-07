const { readFileSync } = require("fs")
const [N1, N2, N3, N4, N5 = 0] = readFileSync("/dev/stdin", "utf8").split(/\s+/).map(Number.parseFloat)

/**
 * @param {number} nA/
 * @param {number} nB
 * @param {number} nC
 * @param {number} nD
 */

function studentAverageNote(nA, nB, nC, nD) {
	return (nA * 2.0 + nB * 3.0 + nC * 4.0 + nD * 1.0) / 10.0
}

/** @param {number} avg */

function printStudentStatus(avg, rec) {
	if (avg >= 7.0) console.log("Aluno aprovado.")
	else if (avg < 5.0) console.log("Aluno reprovado.")
	else if (avg >= 5.0 && avg <= 6.9) {
		const newAvg = (rec + avg) * 0.5

		console.log("Aluno em exame.")
		console.log("Nota do exame:", rec.toFixed(1))
		console.log(newAvg >= 5.0 ? "Aluno aprovado." : "Aluno reprovado.")
		console.log("Media final:", newAvg.toFixed(1))
	}
}

function main() {
	const average = studentAverageNote(N1, N2, N3, N4)
	console.log("Media:", average.toFixed(1))

	printStudentStatus(average, N5)
}

main()