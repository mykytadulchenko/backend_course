import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateChatTable1721827402380 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE chats (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                first_participant UUID,
                second_participant UUID,
                FOREIGN KEY (first_participant) REFERENCES users(id),
                FOREIGN KEY (second_participant) REFERENCES users(id)
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE chats
    `)
  }
}
