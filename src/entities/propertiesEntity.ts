import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import Addresses from './addressesEntity'
import Category from './categoriesEntity'
import Schedules from './schedulesEntity'

@Entity('properties')
class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  sold: boolean

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  value: number

  @Column()
  size: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  // @Column()
  // categoryId:string

  @ManyToOne(() => Category, category => category.property)
  @JoinColumn({name: 'categoryId'})
  category:Category
  
  @OneToOne(() => Addresses ) 
  @JoinColumn({name: 'addressId'})
  address:Addresses

  @OneToMany(() => Schedules, schedules => schedules.property)
  @JoinColumn({name: 'schedulesId'})
  schedules: Schedules
}

export default Property