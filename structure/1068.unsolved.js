const { readFileSync } = require("fs")
const inputs = readFileSync("./dev/stdin", "utf8").split("\n")

const responses = []

function main() {
    for (const input of inputs) {
        const validateParentheses = parenthesesValidate(input)
        if(validateParentheses) responses.push('correct')
        else responses.push('incorrect')
    }

    console.log(responses.join('\n'))
}

function parenthesesValidate(ps = '') {
    const parenthesis = {
        parentheses: ps.match(/\(|\)/g) || [],
        stacks: {
            opened: [],
            closed: []
        },
        codes: {
            opened: String.fromCharCode(40), // (
            closed: String.fromCharCode(41)  // )
        },
        valid: null
    }

    parenthesis.parentheses.forEach((p, index) => {
        if (p === parenthesis.codes.opened) parenthesis.stacks.opened.push(index)
        else if (p === parenthesis.codes.closed) parenthesis.stacks.closed.push(index)
    })

    const setvalidationState = (stacks = { opened: [], closed: [] }) => {
        const { opened, closed } = stacks

        if (opened.length !== closed.length)
            return false

        for (const [index, pc] of Object.entries(opened))
            if (pc >= closed[index]) return false

        return true
    }

    parenthesis.valid = setvalidationState(parenthesis.stacks)
    return parenthesis.valid
}

main()