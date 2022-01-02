SELECT
	CONCAT('Approved: ', name) as "name",
	grade
FROM
	students
WHERE
	grade >= 7.0
ORDER BY
	grade DESC;