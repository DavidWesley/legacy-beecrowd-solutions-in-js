SELECT
	products.name,
	providers.name
FROM
	products,
	providers
WHERE
	providers.name = 'Ajax SA'
	AND providers.id = products.id_providers;