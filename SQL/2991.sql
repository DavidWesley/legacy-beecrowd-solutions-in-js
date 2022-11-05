WITH
brutes AS (
	SELECT DISTINCT
		empregado.matr,
		-- vencimento.nome AS "venc_name",
		-- vencimento.valor AS "venc_value",
		COALESCE(SUM(vencimento.valor) OVER (PARTITION BY empregado.matr), 0) AS "brute"
	FROM
		empregado
		INNER JOIN emp_venc ON emp_venc.matr = empregado.matr
		INNER JOIN vencimento ON vencimento.cod_venc = emp_venc.cod_venc
),
discounts AS (
	SELECT DISTINCT
		empregado.matr,
		-- desconto.nome AS "desc_name",
		-- desconto.valor AS "desc_value",
		COALESCE(SUM(desconto.valor) OVER (PARTITION BY empregado.matr), 0) AS "total_desc"
	FROM
		empregado
		INNER JOIN emp_desc ON emp_desc.matr = empregado.matr
		INNER JOIN desconto ON desconto.cod_desc = emp_desc.cod_desc
),
salaries AS (
	SELECT DISTINCT
		empregado.matr,
		COALESCE(brutes.brute, 0),
		COALESCE(discounts.total_desc, 0) AS "discount",
		(COALESCE(brutes.brute, 0) - COALESCE(discounts.total_desc, 0)) AS "balance"
	FROM
		empregado
		LEFT JOIN brutes ON empregado.matr = brutes.matr
		LEFT JOIN discounts ON empregado.matr = discounts.matr
)

SELECT DISTINCT
	departamento.nome AS "Nome Departamento",
	COUNT(departamento.nome) OVER (PARTITION BY departamento.nome) AS "Numero de Empregados",
	TRUNC(ROUND(AVG(salaries.balance) OVER (PARTITION BY departamento.nome), 2), 2) AS "Media Salarial",
	TRUNC(ROUND(MAX(salaries.balance) OVER (PARTITION BY departamento.nome), 2), 2) AS "Maior Salario",
	(
		CASE
			WHEN MIN(salaries.balance) OVER (PARTITION BY departamento.nome) = 0 THEN 0
			ELSE TRUNC(ROUND(MIN(salaries.balance) OVER (PARTITION BY departamento.nome), 2), 2)
		END
	) AS "Menor Salario"
FROM
	empregado
	LEFT JOIN salaries ON empregado.matr = salaries.matr
	INNER JOIN departamento ON empregado.lotacao = departamento.cod_dep
ORDER BY
	"Media Salarial" DESC;