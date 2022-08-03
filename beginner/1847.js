const { readFileSync } = require("fs")

const [A, B, C] = readFileSync("/dev/stdin", "utf8")
	.split(" ", 3)
	.map((value) => Number.parseInt(value, 10))

function main() {

	if (
		(A > B && B <= C) ||
		(A > B && B > C && (B - C) < (A - B)) ||
		(A < B && B < C && (C - B) >= (B - A)) ||
		(A == B && B < C)
	) { console.log(":)") }

	if (
		(A < B && B >= C) ||
		(A < B && B < C && (C - B) < (B - A)) ||
		(A > B && B > C && (B - C) >= (A - B)) ||
		(A == B && B >= C)
	) { console.log(":(") }

	///////////////////////////////////////////////////////////////////

	// if (A > B && B <= C) console.log(":)")

	// else if (A < B && B >= C) console.log(":(")
	// else if (A < B && B < C && (C - B) < (B - A)) console.log(":(")

	// else if (A > B && B > C && (B - C) < (A - B)) console.log(":)")
	// else if (A < B && B < C && (C - B) >= (B - A)) console.log(":)")
	// else if (A > B && B > C && (B - C) >= (A - B)) console.log(":(")

	// else if (A == B && B < C) console.log(":)")
	// else if (A == B && B >= C) console.log(":(")

	///////////////////////////////////////////////////////////////////
}

main()