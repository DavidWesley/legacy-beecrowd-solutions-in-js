SELECT
	emp.nome AS nome,
	ROUND(brutes.brute - discounts.total_desc, 2) AS salario
FROM
	departamento deps
	INNER JOIN divisao divs ON deps.cod_dep = divs.cod_dep
	INNER JOIN empregado emp ON divs.cod_divisao = emp.lotacao_div
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
WHERE
	(brutes.brute - discounts.total_desc) >= 8000
GROUP BY
	divs.cod_divisao,
	emp.nome,
	brutes.brute,
	discounts.total_desc
HAVING
	(brutes.brute - discounts.total_desc) >= AVG(brutes.brute - discounts.total_desc)
ORDER BY
	divs.cod_divisao ASC