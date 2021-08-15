const { readFileSync } = require('fs')
const inputs = readFileSync('/dev/stdin', 'utf8').split('\n')

function main() {
    const classes = getterClasses(inputs)
    const shirtsSorted = shirtSorter(classes)
    const output = printShirtsByClasses(shirtsSorted)
    console.log(output)
}

function getterClasses(classes = []) {
    const shirts = []

    while (classes.length > 0) {
        const shirtQuantity = Number(classes[0])
        if (shirtQuantity === 0 || isNaN(shirtQuantity)) break

        const thisClass = []

        const interval = (shirtQuantity * 2) + 1
        const [, ...shirtsData] = classes.splice(0, interval)

        while (shirtsData.length > 0) {
            const [name, details] = shirtsData.splice(0, 2)
            const [color, size] = details.split(' ')

            const shirt = { color: color, size: size, name: name }
            thisClass.push(shirt)
        }

        shirts.push(thisClass)
    }

    return shirts
}

/**
 * @typedef { ({ color: string; size: string; name: string } )[][] } shirt
 */

/**
 * @param {shirt} gruopsOfClasses
 * @return {shirt}
 */

function shirtSorter(gruopsOfClasses = [[{ color: '', size: '', name: '' }]]) {
    const shirtsClassifier = {
        sizes: { P: 0, M: 1, G: 2 },
        colours: { branco: 0, vermelho: 1 }
    }

    for (const shirtsGroup of gruopsOfClasses) {
        shirtsGroup.sort((a, b) => {
            const { colours, sizes } = shirtsClassifier

            const coloursOrderValue = colours[a.color] - colours[b.color]
            const namesOrderValue = a.name.localeCompare(b.name, 'pt-BR')
            const sizesOrderValue = sizes[a.size] - sizes[b.size]

            if (coloursOrderValue !== 0) return coloursOrderValue
            else if (sizesOrderValue !== 0) return sizesOrderValue
            else if (namesOrderValue !== 0) return namesOrderValue

        })
    }

    return gruopsOfClasses
}

/**
 * @param {shirt} gruopsOfShirts
 */

function printShirtsByClasses(gruopsOfShirts) {
    const fullPrint = []

    for (const shirts of gruopsOfShirts) {
        const thisPrint = []

        for (const { name, size, color } of shirts) {
            const message = `${color} ${size} ${name}`
            thisPrint.push(message)
        }

        fullPrint.push(thisPrint.join('\n'))
    }

    return fullPrint.join('\n\n')
}

// RUN THE CODE

main()
