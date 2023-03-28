const queries={
    getAllUsers:`SELECT *
                 FROM users`,
getUserEmail:`SELECT *
        FROM users
        WHERE email=$1`,
createUser:`INSERT INTO users(name,password,email,image,isadmin)
            VALUES
            ($1, $2, $3, $4, $5)`,
 deleteUser:`DELETE
            FROM users
            WHERE email=$1`,
updateUser:`UPDATE users
            SET name=$2 , password=$3 , email=$4 , image =$5
            WHERE email=$1`,
addMovie:`INSERT INTO favs(idfilms,idUsers,title,image,gender,year,length,direction)
          VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8) `,
checkMovie: `SELECT *
             FROM favs
             WHERE idUsers=$1 AND idfilms=$2`,
myMovies:`SELECT *
          FROM favs
          WHERE idUsers=$1`,
removeMovie:`DELETE 
             FROM favs
             WHERE idusers=$1 AND idfilms=$2`
 
}

module.exports=queries