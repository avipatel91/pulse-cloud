import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Session } from './Session'

@Entity()
export class Trainer {
  @PrimaryColumn({ type: 'char', length: 28, unique: true })
  id!: string

  @Column({ type: 'varchar', length: 25 })
  firstName!: string

  @Column({ type: 'varchar', length: 25 })
  lastName!: string

  @Column({ type: 'varchar', length: 50 })
  email!: string

  @Column({ type: 'jsonb' })
  heartRateRunningTotal!: HeartRateRunningTotal

  @Column({ type: 'varchar', length: 15 })
  userType!: string

  @OneToMany(() => Session, (session: Session) => session.trainer)
  sessions!: Session[]
}
