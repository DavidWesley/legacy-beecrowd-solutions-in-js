SELECT
	products.id,
	products.name
FROM
	products,
	INNER JOIN categories ON products.id_categories = categories.id
WHERE
	AND LOWER(categories.name) LIKE 'super%';