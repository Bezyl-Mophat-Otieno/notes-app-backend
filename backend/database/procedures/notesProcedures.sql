
-- All my procedures


CREATE PROCEDURE newNote 
@id VARCHAR(150),
@title VARCHAR(100),
@content VARCHAR(255)
AS BEGIN
    INSERT INTO notes (id, title, content) VALUES (@id, @title, @content)
END

GO

SELECT * FROM notes

GO


CREATE OR ALTER PROCEDURE getNotes
AS BEGIN
    SELECT * FROM notes
END
GO

CREATE PROCEDURE getNoteById
@id VARCHAR(150)
AS BEGIN
    SELECT * FROM notes WHERE id = @id
END
GO

CREATE PROCEDURE updateNoteById
@id VARCHAR(150),
@title VARCHAR(100),
@content VARCHAR(255)
AS BEGIN
    UPDATE notes SET title = @title, content = @content WHERE id = @id
END

GO

CREATE PROCEDURE deleteNoteById
@id VARCHAR(150)
AS BEGIN
    DELETE FROM notes WHERE id = @id
END
GO


