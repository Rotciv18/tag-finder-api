import {
  Entity, Column, BaseEntity, PrimaryColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ unique: true, type: 'bigint' })
    id: number;

  @Column()
    name: string;

  @Column()
    username: string;

  @Column()
    image: string;
}
