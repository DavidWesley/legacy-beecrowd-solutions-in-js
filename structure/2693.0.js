const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {{ name: string, region: string, distance: string }} studentModel */

/** @param {studentModel[]} studentsList */

function sortStudentsList(studentsList) {
	return studentsList.sort((studentA, studentB) => {
		if (studentA.distance !== studentB.distance) return studentA.distance.localeCompare(studentB.distance, "en-US", { numeric: true })
		else if (studentA.region !== studentB.region) return studentA.region.localeCompare(studentB.region, "en-US")
		else return studentA.name.localeCompare(studentB.name, "en-US")
	})
}

function main() {
	while (input.length > 0) {
		const Q = Number.parseInt(input.shift(), 10)

		if (isNaN(Q)) break // EOFile Condition Verification

		const students = Array.from({ length: Q }).reduce(studentsList => {
			const [name, region, distance] = input.shift().split(" ")

			studentsList.push({ name, region, distance })

			return studentsList
		}, [])

		console.log(
			sortStudentsList(students)
				.map(student => student.name)
				.join("\n")
		)
	}
}

main()
