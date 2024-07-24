import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import User from "./User"

@Entity("jwt")
export default class JWT {
  @PrimaryColumn("uuid")
  user_id: string

  @Column({ type: "varchar", length: 255 })
  access_token: string

  @Column({ type: "varchar", length: 255 })
  refresh_token: string

  @ManyToOne(() => User, (user) => user.jwt, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User
}
