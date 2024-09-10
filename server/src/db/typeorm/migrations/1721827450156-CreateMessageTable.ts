import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateMessageTable1721827450156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE messages(
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                body VARCHAR(255),
                conversation_id UUID,
                sender UUID,
                receiver UUID,
                send_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (sender) REFERENCES users(id),
                FOREIGN KEY (receiver) REFERENCES users(id),
                FOREIGN KEY (conversation_id) REFERENCES chats(id) ON DELETE CASCADE
            );
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE messages
        `)
  }
}
