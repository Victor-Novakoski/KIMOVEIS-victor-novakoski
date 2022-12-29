import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Property from './propertiesEntity'

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50, unique: true })
  name: string

  @OneToMany(() => Property, property => property.category)
  property:Property
}

export default Category
