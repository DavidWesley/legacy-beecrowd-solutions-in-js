SELECT
	id,
	password,
	MD5(password) as "MD5"
FROM
	account;