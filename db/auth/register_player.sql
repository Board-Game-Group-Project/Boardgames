INSERT INTO players (
  username,
  password,
  email
) VALUES (
  ${username},
  ${hash},
  ${email}
)
RETURNING player_id, email, username
;