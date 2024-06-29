import { MigrationInterface, QueryRunner } from "typeorm"

export class InitializeDatabase1719676136993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(32),
            username VARCHAR(16),
            email VARCHAR(32)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE orders (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            total DECIMAL(6, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id UUID,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `)

    await queryRunner.query(`
        CREATE TABLE products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(255),
            price DECIMAL(6, 2)
        );
    `)

    await queryRunner.query(`
        CREATE TABLE order_details (
            order_id UUID,
            product_id UUID,
            qty INT,
            PRIMARY KEY (order_id, product_id),
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE order_details
    `)

    await queryRunner.query(`
        DROP TABLE products
    `)

    await queryRunner.query(`
        DROP TABLE orders
    `)

    await queryRunner.query(`
        DROP TABLE users
    `)
  }
}
