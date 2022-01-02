SELECT
	customers.name,
	rentals.rentals_date
FROM
	customers
	INNER JOIN rentals ON customers.id = rentals.id_customers
WHERE
	EXTRACT( YEAR FROM rentals.rentals_date ) = 2016
	AND EXTRACT( MONTH FROM rentals.rentals_date ) = 9;