const { readFileSync } = require("fs")
const input = readFileSync("./dev/stdin", "utf8").split(' ')

const [code, quantities] = input.map(Number)

/**
 * @param {number} productID
 * @param {number} quantity
 * @param {Map<number, number>} products
 */

function cost(productID, quantity, products) {
    const product = products.get(productID)
    const value = quantity * product
    return value
}

function main() {
    const products = [[1, 4.00], [2, 4.50], [3, 5.00], [4, 2.00], [5, 1.50]] // [[ID, value]]
    const productsMap = new Map(Object(products))
    const total = cost(code, quantities, productsMap)

    console.log(`Total: R$ ${total.toFixed(2)}`)
}

main()