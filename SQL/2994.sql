SELECT
	D.name,
	ROUND( SUM((A.hours * 150.0) * (1 + W.bonus * 0.01)), 1 ) AS "salary"
FROM
	doctors D
	INNER JOIN attendances A ON D.id = A.id_doctor
	INNER JOIN work_shifts W ON W.id = A.id_work_shift
GROUP BY D.id
ORDER BY "salary" DESC;