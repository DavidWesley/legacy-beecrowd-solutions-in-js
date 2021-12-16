const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

/** @typedef {{ name: string, region: string, distance: string }} studentModel */

/** @param {studentModel[]} studentsList */

function sortStudentsList(studentsList) {
	return studentsList.sort((a, b) => {
		if (a.distance !== b.distance) return a.distance.localeCompare(b.distance, 'pt-BR', { numeric: true })
		else if (a.region !== b.region) return a.region.localeCompare(b.region, "pt-BR")
		else return a.name.localeCompare(b.name, "pt-BR")
	})
}

function getStudentsProps(propsList = []) {
	return propsList.map(props => {
		const [name, region, distance] = props

		return Object.freeze({
			name,
			region,
			distance
		})
	})
}

function main() {

	const names = []

	while (input.length > 0) {
		const Q = Number.parseInt(input.shift(), 10)
		if (isNaN(Q)) break // EOFile Condition Verification

		const studentsPropsList = input
			.splice(0, Q)
			.map(studentProps => studentProps.split(' '))

		const studentsProps = getStudentsProps(studentsPropsList)
		const sortedStudentList = sortStudentsList(studentsProps)
		const studentsNames = sortedStudentList.map(student => student.name)

		names.push(...studentsNames)
	}

	console.log(`${names.join('\n')}`)
}

main()