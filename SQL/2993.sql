SELECT amount AS "most_frequent_value"
FROM value_table
GROUP BY amount
ORDER BY count(amount) DESC
LIMIT 1;