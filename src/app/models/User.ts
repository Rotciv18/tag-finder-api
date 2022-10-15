import {
  Entity, Column, BaseEntity, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import { Tweet } from './Tweet';

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

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets: Tweet[];
}
