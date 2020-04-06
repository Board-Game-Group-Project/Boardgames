CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(40),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE personal_board (
    personal_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(player_id) NOT NULL,
    wins INT,
    losses INT,
    game_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE scoreboard (
    board_id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players(player_id) NOT NULL,
    personal_id INT REFERENCES personal_board(personal_id) NOT NULL
);
