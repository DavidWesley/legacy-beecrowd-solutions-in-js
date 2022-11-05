SELECT
	deps.nome AS "Departamento",
	emp.nome AS "Empregado",
	(CASE WHEN brutes.brute = 0 THEN 0 ELSE ROUND(brutes.brute, 2) END) AS "Salario Bruto",
	(CASE WHEN discounts.total_desc = 0 THEN 0 ELSE ROUND(discounts.total_desc, 2) END) AS "Total Desconto",
	(CASE WHEN (brutes.brute - discounts.total_desc) = 0 THEN 0 ELSE ROUND(brutes.brute - discounts.total_desc, 2) END) AS "Salario Liquidoaws"
FROM
	empregado emp
	INNER JOIN departamento deps ON deps.cod_dep = emp.lotacao
	INNER JOIN (
		SELECT
			emp.matr,
			COALESCE(SUM(vencimento.valor), 0) AS brute
		FROM
			empregado emp
			LEFT JOIN emp_venc ON emp.matr = emp_venc.matr
			LEFT JOIN vencimento ON emp_venc.cod_venc = vencimento.cod_venc
		GROUP BY
			emp.matr
	) AS brutes ON emp.matr = brutes.matr
	INNER JOIN (
		SELECT
			emp.matr,
			COALESCE(SUM(desconto.valor), 0) AS total_desc
		FROM
			empregado emp
			LEFT JOIN emp_desc ON emp.matr = emp_desc.matr
			LEFT JOIN desconto ON emp_desc.cod_desc = desconto.cod_desc
		GROUP BY
			emp.matr
	) AS discounts ON emp.matr = discounts.matr
GROUP BY
	emp.matr,
	deps.nome,
	emp.nome,
	brutes.brute,
	discounts.total_desc
ORDER BY
	(brutes.brute - discounts.total_desc) DESC,
	emp.nome DESC;