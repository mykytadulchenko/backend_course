import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class AddJWTTable1719756143085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE jwt (
            user_id UUID PRIMARY KEY,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            access_token VARCHAR(255),
            refresh_token VARCHAR(255)
        );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("jwt")
  }
}
