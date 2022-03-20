const { readFileSync } = require("fs")
const [phylumName, className, nutritionTypeName] = readFileSync("/dev/stdin", "utf8")
	.split("\n")
	.slice(0, 3)

const AnimalTree = {
	vertebrado: {
		ave: {
			carnivoro: "aguia",
			onivoro: "pomba",
		},
		mamifero: {
			onivoro: "homem",
			herbivoro: "vaca",
		},
	},
	invertebrado: {
		inseto: {
			hematofago: "pulga",
			herbivoro: "lagarta",
		},
		anelideo: {
			hematofago: "sanguessuga",
			onivoro: "minhoca",
		},
	},
}

const handler = {
	get(target, prop, receiver) {
		if (typeof target[prop] === "object" && target[prop] !== null) return new Proxy(target[prop], handler)
		else return target[prop]

	},
	set(target, key, value, receiver) {
		return false
	}
}

const AnimalTreeDeeplyFrozen = new Proxy(AnimalTree, handler)

function main() {
	console.log(
		AnimalTreeDeeplyFrozen[phylumName][className][nutritionTypeName]
	)
}

main()
