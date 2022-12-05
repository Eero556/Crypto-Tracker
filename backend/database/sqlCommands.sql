CREATE TYPE valid_roles AS ENUM('admin','user')

CREATE TABLE users(
    id SERIAL PRIMARY KEY(changed to UUID),
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(62) NOT NULL UNIQUE,
    passhass VARCHAR NOT NULL,
    roles valid_roles DEFAULT 'user'
);



CREATE TYPE valid_roles AS ENUM('admin','user');

CREATE TABLE usergroup(
	usergroup_id SERIAL,
	id UUID,
	userRole valid_roles DEFAULT 'user',
	PRIMARY KEY (usergroup_id),
	FOREIGN KEY (id)
	REFERENCES users(id)
);

// remove wanted coin from array
update users set watchlist = array_remove(watchlist,'bitcoin') where id=29 

//append wanted coin to array
UPDATE users SET watchlist = array_append(watchlist,'bitcoin') WHERE id=29