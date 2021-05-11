-- SQLite
$sqlite3 my.db

CREATE TABLE todolist(
	Id INTERGER not null AUTOINCREMENT PRIMARY KEY
	todo TEXT not null
);

DELETE * FROM todolist
