UPDATE players
  SET
    username = ${username},
    email = ${email}
  WHERE player_id = ${id}
RETURNING player_id, email, username
;