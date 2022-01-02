SELECT
	movies.id,
	movies.name
FROM
	movies
	INNER JOIN genres ON movies.id_genres = genres.id
WHERE
	genres.description = 'Action';