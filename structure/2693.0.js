const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {{ name: string, region: string, distance: number }} studentModel */

/** @param {studentModel[]} studentsList */

function sortStudentsList(studentsList) {
	return studentsList.sort((a, b) => {
		if (a.distance !== b.distance) return a.distance - b.distance
		else if (a.region !== b.region)
			return a.region.localeCompare(b.region, "en-US")
		else return a.name.localeCompare(b.name, "en-US")
	})
}

function main() {
	while (input.length > 0) {
		const Q = Number.parseInt(input.shift(), 10) //=

		if (isNaN(Q)) break // EOFile Condition Verification

		const students = Array.from({ length: Q }).reduce((studentsList) => {
			const [name, region, dist] = input.shift().split(" ")

			const studentProps = {
				name: name,
				region: region,
				distance: Number.parseInt(dist, 10),
			}

			studentsList.push({ ...studentProps })

			return studentsList
		}, [])

		console.log(
			sortStudentsList(students)
				.map((student) => student.name)
				.join("\n")
		)
	}
}

main()
