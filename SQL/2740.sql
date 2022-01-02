(
	SELECT CONCAT('Podium: ', team) as "name"
	FROM league
	WHERE position BETWEEN 1 AND 3
)

UNION ALL

(
	SELECT CONCAT('Demoted: ', team) as "name"
	FROM league
	WHERE position BETWEEN 14 AND 15
)
