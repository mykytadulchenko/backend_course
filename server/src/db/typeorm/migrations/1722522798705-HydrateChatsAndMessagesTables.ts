import { MigrationInterface, QueryRunner } from "typeorm"
import Chat from "../entities/Chat"
import Message from "../entities/Message"

export class HydrateChatsAndMessagesTables1722522798705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.query(`SELECT * FROM users`)
    const chat: InstanceType<typeof Chat> = (
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Chat)
        .values({
          first_participant: users[0].id,
          second_participant: users[1].id,
        })
        .returning("*")
        .execute()
    ).raw[0]

    await queryRunner.manager.getRepository(Message).insert({
      body: "test message text 1",
      send_at: "2024-08-03 14:40:33.504607",
      conversation_id: chat.id,
      sender: users[0].id,
      receiver: users[1].id,
    })

    await queryRunner.manager.getRepository(Message).insert({
      body: "test message text 2",
      conversation_id: chat.id,
      sender: users[0].id,
      receiver: users[1].id,
    })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        TRUNCATE TABLE chats CASCADE;
        `)
  }
}
