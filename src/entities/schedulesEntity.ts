import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Property from './propertiesEntity'
import User from './userEntity'

@Entity('schedules')
class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ type: 'date' })
  date: string

  @Column({ type: 'time' })
  hour: string

  @ManyToOne(() => Property, property => property.schedules)
  property: Property

  @ManyToOne(() => User, user => user.schedules)
  user: User
}

export default Schedules
