SELECT
	candidate.name,
	ROUND(
		(2 * S.math + 3 * S.specific + 5 * S.project_plan) / 10.0,
		2
	) as "avg"
FROM
	candidate
	INNER JOIN score S ON candidate.id = S.candidate_id
ORDER BY
	"avg" DESC