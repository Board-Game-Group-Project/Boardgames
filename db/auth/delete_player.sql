DELETE FROM scoreboard
    WHERE player_id = $1
;

DELETE FROM players
    WHERE player_id = $1
;