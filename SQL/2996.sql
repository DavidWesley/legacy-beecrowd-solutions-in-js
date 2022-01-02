SELECT
	P.year,
	senderTB.name AS "sender",
	receiverTB.name AS "receiver"
FROM
	packages P
	LEFT JOIN users senderTB ON P.id_user_sender = senderTB.id
	LEFT JOIN users receiverTB ON P.id_user_receiver = receiverTB.id
WHERE
	( P.color = 'blue' OR P.year = 2015 )
	AND 'Taiwan' NOT IN (senderTB.address, receiverTB.address)
ORDER BY
	P.year DESC;