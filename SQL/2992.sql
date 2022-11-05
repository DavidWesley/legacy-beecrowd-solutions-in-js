WITH divs_avg_salaries AS (
	SELECT
		deps.nome AS "departamento",
		deps.cod_dep,
		divs.nome AS "divisao",
		ROUND(AVG(brutes.brute - discounts.total_desc), 2) AS "media"
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
	GROUP BY
		divs.cod_divisao,
		deps.cod_dep,
		divs.nome,
		deps.nome
	ORDER BY
		AVG(brutes.brute - discounts.total_desc) DESC
)

SELECT
	T.departamento,
	T.divisao,
	T.media
FROM
(
	(SELECT * FROM divs_avg_salaries AS das1 WHERE das1.cod_dep = 1 ORDER BY das1.media DESC LIMIT 1) UNION ALL
	(SELECT * FROM divs_avg_salaries AS das2 WHERE das2.cod_dep = 2 ORDER BY das2.media DESC LIMIT 1) UNION ALL
	(SELECT * FROM divs_avg_salaries AS das3 WHERE das3.cod_dep = 3 ORDER BY das3.media DESC LIMIT 1)
) T
ORDER BY
	T.media DESC