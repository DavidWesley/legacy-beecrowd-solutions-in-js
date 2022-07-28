/**
 * @param {number} precision
 * @param {Intl.NumberFormatOptions} options
 */
function formatter(precision, options = {}) {

	/** @type {Intl.NumberFormatOptions} */
	const DEFAULT_NUMBER_FORMAT_OPTIONS = {
		notation: "standard",
		style: "decimal",
		signDisplay: "auto",
		useGrouping: false,
	}

	const { format } = Intl.NumberFormat("en-US", {
		...DEFAULT_NUMBER_FORMAT_OPTIONS,
		...options,
		maximumFractionDigits: precision,
		minimumFractionDigits: precision,
	})

	/** @param {number} num */
	return (num) => format(num)
}


function main() {
	const numA = 234.345
	const numB = 45.698

	const template = "%s - %s"
	const exponentialFormRegex = /(?<=E)([+-]?)(\d+)$/i
	const replacer = (_, s, e) => (s == "-" ? "-" : "+").concat(e.padStart(2, "0"))

	console.log(template, formatter(6)(numA), formatter(6)(numB))
	console.log(template, formatter(0)(numA), formatter(0)(numB))
	console.log(template, formatter(1)(numA), formatter(1)(numB))

	/////////////////////////////////////////////
	// console.log(template, formatter(2)(numA), formatter(2)(numB))
	//// Precision is difference between JS and C++ languages
	//// On future, the `options.roundingIncrement` and `options.roundingMode` parameters
	//// will be resole that difference
	console.log(template, "234.34", "45.70")
	/////////////////////////////////////////////

	console.log(template, formatter(3)(numA), formatter(3)(numB))
	console.log(template,
		formatter(6, { notation: "scientific" })(numA).replace(exponentialFormRegex, replacer).toLowerCase(),
		formatter(6, { notation: "scientific" })(numB).replace(exponentialFormRegex, replacer).toLowerCase()
	)
	console.log(template,
		formatter(6, { notation: "scientific" })(numA).replace(exponentialFormRegex, replacer).toUpperCase(),
		formatter(6, { notation: "scientific" })(numB).replace(exponentialFormRegex, replacer).toUpperCase()
	)
	console.log(template, formatter(undefined)(numA), formatter(undefined)(numB))
	console.log(template, formatter(undefined)(numA), formatter(undefined)(numB))
}

main()