--crear database llamado usersPelis, y luego insertar esto en el query editor
CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  password varchar(255) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);