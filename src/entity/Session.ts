import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  Column,
} from 'typeorm'
import { Member } from './Member'
import { Trainer } from './Trainer'

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToMany(() => Member, (member: Member) => member.sessions)
  members!: Member[]

  @ManyToOne(() => Trainer, (trainer: Trainer) => trainer.sessions)
  trainer!: Trainer

  @Column({ type: 'varchar', length: 10, unique: true })
  sessionCode!: string

  @Column({ type: 'varchar', length: 25 })
  name!: string
}
