const { readFileSync } = require("fs")
const input = readFileSync("/dev/stdin", "utf8").split("\n")

const DDDKey = Number.parseInt(input.shift())

function main() {
	const datas = {
		codes: [61, 71, 11, 21, 32, 19, 27, 31],
		destinations: ["Brasilia", "Salvador", "Sao Paulo", "Rio de Janeiro", "Juiz de Fora", "Campinas", "Vitoria", "Belo Horizonte"]
	}

	const DDDObj = new DDD(datas)
	const DDDMap = DDDObj.map()
	const DDDQuery = DDDMap.has(DDDKey) ? DDDMap.get(DDDKey) : "DDD nao cadastrado"

	console.log(DDDQuery)
}

main()

/**
 * @param {{codes: number[], destinations: string[]}} datas
 */

function DDD({ codes = [], destinations = [] }) {
	// this.datas: { codes: codes, destinations: destinations },
	this.entries = function () {
		return Array.from(
			{ length: codes.length },
			(_, i) => [codes[i], destinations[i]]
		)
	}

	this.map = function () {
		return new Map(Object(this.entries()))
	}

	this.add = function (code, newDestination) {
		if (this.map().has(code)) return

		codes.push(Number(code))
		destinations.push(String(newDestination))
	}

	this.delete = function (code) {
		if (!this.map().has(code)) return
		const indexCode = codes.indexOf(code)

		codes.splice(indexCode, 1)
		destinations.splice(indexCode, 1)
	}

	this.deleteMultiples = function (...codes) {
		for (const code of codes) this.delete(code)
	}
}