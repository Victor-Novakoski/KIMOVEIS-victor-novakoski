import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({name:'propertyId'})
  property: Property

  @Column({type:'uuid'})
  propertyId:string

  @ManyToOne(() => User, user => user.schedules)
  @JoinColumn({name:'userId'})
  user: User

  @Column({type:'uuid'})
  userId:string
}

export default Schedules
