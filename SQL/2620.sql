SELECT
	customers.name,
	orders.id
FROM
	orders
	INNER JOIN customers ON customers.id = orders.id_customers
WHERE
	orders.orders_date BETWEEN TO_DATE('2016-01-01', 'YYYY-MM-DD')
	AND TO_DATE('2016-06-30', 'YYYY-MM-DD');