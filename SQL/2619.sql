SELECT
	products.name,
	providers.name,
	products.price
FROM
	products,
	INNER JOIN providers ON products.id_providers = providers.id
	INNER JOIN categories ON products.id_categories = categories.id
WHERE
	categories.name = 'Super Luxury'
	AND products.price > 1000