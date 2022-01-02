SELECT
	name,
	(victories + draws + defeats) as "matches",
	victories,
	defeats,
	draws,
	(3 * board.victories + board.draws ) as "score"

FROM (
	SELECT
		teams.name,
		count( CASE WHEN (M.team_1_goals > M.team_2_goals AND teams.id = M.team_1) OR (M.team_2_goals > M.team_1_goals AND teams.id = M.team_2) THEN 1 END ) as victories,
		count( CASE WHEN (M.team_1_goals < M.team_2_goals AND teams.id = M.team_1) OR (M.team_2_goals < M.team_1_goals AND teams.id = M.team_2) THEN 1 END ) as defeats,
		count( CASE WHEN (M.team_1_goals = M.team_2_goals AND teams.id IN (M.team_1, M.team_2)) THEN 1 END ) as draws
	FROM
		matches M, teams
	GROUP BY teams.name
) as board

ORDER BY
	"score" DESC,
	name ASC;