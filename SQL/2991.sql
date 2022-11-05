SELECT
	deps.nome AS "Nome Departamento",
	COUNT(deps.nome) AS "Numero de Empregados",
	ROUND(AVG(brutes.brute - discounts.total_desc), 2) AS "Media Salarial",
	ROUND(MAX(brutes.brute - discounts.total_desc), 2) AS "Maior Salario",
	(
		CASE
			WHEN MIN(brutes.brute - discounts.total_desc) = 0 THEN 0
			ELSE ROUND(MIN(brutes.brute - discounts.total_desc), 2)
		END
	) AS "Menor Salario"
FROM
	departamento deps
	INNER JOIN empregado emp ON deps.cod_dep = emp.lotacao
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
	deps.cod_dep,
	deps.nome
ORDER BY
	AVG(brutes.brute - discounts.total_desc) DESC