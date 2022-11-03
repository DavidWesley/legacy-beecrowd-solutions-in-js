-- CREATE TABLE clients (
-- 	id INTEGER PRIMARY KEY,
-- 	name VARCHAR(50),
-- 	investment NUMERIC
-- );
-- CREATE TABLE operations (
-- 	id INTEGER PRIMARY KEY,
-- 	client_id INTEGER REFERENCES clients(id),
-- 	MONTH INTEGER,
-- 	profit NUMERIC
-- );
-- INSERT INTO
-- 	clients (id, name, investment)
-- VALUES
-- 	(1, 'Daniel', 500),
-- 	(2, 'Oliveira', 2000),
-- 	(3, 'Lucas', 1000);
-- INSERT INTO
-- 	operations (id, client_id, MONTH, profit)
-- VALUES
-- 	(1, 1, 1, 230),
-- 	(2, 2, 1, 1000),
-- 	(3, 2, 2, 1000),
-- 	(4, 3, 1, 100),
-- 	(5, 3, 2, 300),
-- 	(6, 3, 3, 900),
-- 	(7, 3, 4, 400);


WITH balances AS (
	SELECT
		clients.name,
		operations.client_id,
		clients.investment,
		operations.month,
		(
			SUM(operations.profit) OVER (
				PARTITION BY operations.client_id
				ORDER BY
					operations.client_id ROWS BETWEEN UNBOUNDED PRECEDING
					AND CURRENT ROW
			) - clients.investment
		) AS "balance"
	FROM
		clients
		LEFT JOIN operations ON operations.client_id = clients.id
),

paybacks AS (
	SELECT
		client_id,
		name,
		investment,
		balance,
		month,
		ROW_NUMBER() over(
			PARTITION BY client_id
			ORDER BY
				month ASC
		) AS "rank"
	FROM
		balances
	WHERE
		balance >= 0
)


SELECT
	name,
	investment,
	"month" AS "month_of_payback",
	balance AS "return"
FROM
	paybacks
WHERE
	rank = 1
ORDER BY
	"return" DESC