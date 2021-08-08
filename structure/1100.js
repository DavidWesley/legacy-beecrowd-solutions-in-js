const { readFileSync } = require("fs")
const inputs = readFileSync('./dev/stdin', 'utf8').split("\n")

const responses = []

function main() {
    for (const input of inputs) {
        if (input === "0") break
        const cards = createCardsSequence(Number(input))
        const [discardedCards, [reaming]] = discardCards(cards)
        printCardsOrganization(reaming, discardedCards)
    }
}

function createCardsSequence(size) {
    const array = Array.from({ length: size }, (_, i) => i + 1)
    return array
}

function discardCards(cards = []) {
    const discardedCardsArray = []
    while (cards.length > 1) {
        discardedCardsArray.push(cards.shift())
        cards.push(cards.shift())
    }

    return [discardedCardsArray, cards]
}

function printCardsOrganization(reamingCard, discardedCards = []) {
    const messageCards = {
        discarded: `Discarded cards:${discardedCards.length > 0 ? " " : ''}${discardedCards.join(", ")}`,
        remaing: `Remaining card: ${reamingCard}`
    }

    responses.push(messageCards.discarded, messageCards.remaing)
}

main()
console.log(responses.join('\n'))