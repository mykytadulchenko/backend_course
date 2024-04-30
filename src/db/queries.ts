const queries = {
  GET_USERS_QUERY: "SELECT * FROM users",
  GET_USER_QUERY: "SELECT * FROM users WHERE id = $1",
  SET_USER_QUERY: "INSERT INTO USERS (name, username, email) values($1, $2, $3)",
  EDIT_USER_QUERY: "UPDATE users SET name = $2, username = $3, email = $4 WHERE id = $1",
  DELETE_USER_QUERY: "DELETE FROM users WHERE id = $1",
}

export default queries
