SELECT
	L.name,
	ROUND(L.omega * 1.618, 3) AS "Fator N"
FROM
	dimensions D
	INNER JOIN life_registry L ON D.id = L.dimensions_id
WHERE
	D.name IN ('C774', 'C875')
	AND LOWER(L.name) LIKE 'richard%'
ORDER BY
	L.omega ASC;