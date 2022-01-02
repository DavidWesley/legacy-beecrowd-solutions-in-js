SELECT
    empregados.cpf,
    empregados.enome,
    departamentos.dnome
FROM
    empregados
    INNER JOIN departamentos ON empregados.dnumero = departamentos.dnumero
    INNER JOIN projetos ON projetos.dnumero = departamentos.dnumero
    LEFT JOIN trabalha ON trabalha.cpf_emp = empregados.cpf
WHERE
    trabalha.cpf_emp IS NULL
ORDER BY
    empregados.cpf;