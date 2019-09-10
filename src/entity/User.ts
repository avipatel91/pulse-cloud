import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({ type: 'char', length: 28, unique: true })
  id!: string

  @Column({ type: 'varchar', length: 25 })
  firstName!: string

  @Column({ type: 'varchar', length: 25 })
  lastName!: string

  @Column({ type: 'int2' })
  averageHeartRate!: number
}
