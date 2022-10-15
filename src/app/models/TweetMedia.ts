import {
  Entity, Column, BaseEntity, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

import { Tweet } from './Tweet';

@Entity()
export class TweetMedia extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
    id: number;

  @Column()
    type: string;

  @Column()
    url: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  @ManyToOne(() => Tweet, (tweet) => tweet.tweet_medias, { nullable: false })
    tweet: Tweet;
}
