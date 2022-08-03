const { readFileSync } = require("fs")
const [connectorA, connectorB] = readFileSync("/dev/stdin", "utf8")
	.split("\n", 2)
	.map(line => line.split(" ", 5).map(Number))

const Connector = {
	codes: {
		0: "SOCKET",
		1: "PLUG",
	},

	/**
	 * @param {number[]} cA
	 * @param {number[]} cB
	 */
	isCompatible: function (cA, cB) {
		for (let index in cA)
			if (Connector.codes[cA[index]] === Connector.codes[cB[index]])
				return false

		return true
	}
}

function main() {
	const isCompatible = Connector.isCompatible(connectorA, connectorB)
	console.log(isCompatible ? "Y" : "N")
}

main()