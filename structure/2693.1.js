const { readFileSync } = require("fs")
const lines = readFileSync("/dev/stdin", "utf8").split("\n")

const input = (function* (lines) {
	for (const line of lines) yield line
})(lines)

/** @typedef {{ name: string, region: string, distance: string }} studentPropsType */

/** @param {studentPropsType} studentA */
/** @param {studentPropsType} studentB */

function compareStudentsList(studentA, studentB) {
	if (studentA.distance !== studentB.distance) return studentA.distance.localeCompare(studentB.distance, "pt-BR", { numeric: true })
	else if (studentA.region !== studentB.region) return studentA.region.localeCompare(studentB.region, "pt-BR")
	else return studentA.name.localeCompare(studentB.name, "pt-BR")
}

/**
 * @param {string[][]} propsList
 * @returns {studentPropsType[]}
 */

function getStudentsProps(propsList) {
	return propsList.map(([name, region, distance]) => {
		return Object.freeze({ name, region, distance })
	})
}

function main() {
	const names = []

	for (let curr = input.next(); !curr.done; curr = input.next()) {
		const size = Number.parseInt(curr.value, 10)

		if (isNaN(size)) break // EOFile Condition Verification

		const studentsList = Array.from({ length: size }, () => input.next().value?.split(" "))

		const sortedStudentNames = getStudentsProps(studentsList)
			.sort(compareStudentsList)
			.map((student) => student.name)

		Reflect.apply(Array.prototype.push, names, sortedStudentNames)
	}

	console.log(names.join("\n"))
}

main()