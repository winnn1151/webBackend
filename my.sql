-- SQLite
$sqlite3 my.db

CREATE TABLE todolist(
	Id INTERGER not null AUTOINCREMENT PRIMARY KEY
	todo TEXT not null
);

DELETE * FROM todolist

CREATE TABLE userpass(
	id INTERGER not null AUTOINCREMENT PRIMARY KEY
	username TEXT not null
	password TEXT not null
);

DELETE * FROM userpass