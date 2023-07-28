--  creating a notes table with id , title , content , created_at 

CREATE TABLE notes (
    id VARCHAR(150) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIME  NOT NULL DEFAULT CURRENT_TIMESTAMP
);