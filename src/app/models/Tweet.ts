import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { TweetMedia } from './TweetMedia';
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

  @OneToMany(() => TweetMedia, (tweet_media) => tweet_media.tweet)
    tweet_medias: TweetMedia[];
}
