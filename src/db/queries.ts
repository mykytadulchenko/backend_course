const queries = {
  GET_USERS_QUERY: "SELECT * FROM users",
  GET_USER_QUERY: "SELECT * FROM users WHERE id = $1",
  GET_USER_ORDERS: "SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC LIMIT $2 OFFSET $3",
  GET_ORDER_PRODUCT_QTY_COUNT:
    "SELECT id, COUNT(order_details.product_id) as product_qty FROM orders INNER JOIN order_details ON id = order_details.order_id WHERE id = $1 GROUP BY id ",
  GET_PRODUCTS: "SELECT * FROM products WHERE LOWER(title) LIKE $1",
  SET_USER_QUERY: "INSERT INTO USERS (name, username, email) values($1, $2, $3)",
  EDIT_USER_QUERY: "UPDATE users SET name = $2, username = $3, email = $4 WHERE id = $1",
  DELETE_USER_QUERY: "DELETE FROM users WHERE id = $1",
}

export default queries
