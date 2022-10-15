import {
  Entity, Column, BaseEntity, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import { User } from './User';

@Entity()
export class Tweet extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
    id: number;

  @Column()
    message: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  @ManyToOne(() => User, (user) => user.tweets, { nullable: false })
    user: User;
}
