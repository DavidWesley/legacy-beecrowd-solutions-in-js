SELECT
  name,
  CAST( EXTRACT (DAY FROM payday) AS INT ) as "day"
FROM loan;