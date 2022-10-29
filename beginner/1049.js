const { readFileSync } = require("node:fs")
const [phylumName, className, nutritionTypeName] = readFileSync("/dev/stdin", "utf8").split("\n", 3)

/** @param {object} obj */
function DeepFreezeObject(obj) {
	Object.freeze(obj)
	Object.getOwnPropertyNames(obj).forEach((prop) => {
		if (
			Reflect.has(obj, prop)
			&& typeof obj[prop] === "object"
			&& Object.isFrozen(obj[prop]) === false
		)
			DeepFreezeObject(obj[prop])
	})

	return obj
}

const AnimalTree = DeepFreezeObject({
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
})

console.log(
	AnimalTree[phylumName][className][nutritionTypeName]
)
