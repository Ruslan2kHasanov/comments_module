import React from 'react';
import './index.scss';
import logo from 'assets/logo.svg';
import { TComment } from '../../../domain/comment/TComment';
import { TUser } from '../../../domain/user/TUser';

interface CommentCardProps {
  data: TComment;
  author?: TUser;
}

const CommentCard: React.FC<CommentCardProps> = ({ data, author }) => (
  <div className="comment_card">
    <div className="comment_card__heading">
      <img src={author.avatar ?? logo} alt={author.name} loading="lazy" className="comment_card__avatar" />
      <span className="comment_card__name">{author.name}</span>
      {/* @ts-ignore */}
      <span className="comment_card__date">{data.date_create.toDateString()}</span>
    </div>
    <div className="comment_card__body">
      <span>{data.text}</span>
    </div>
  </div>
);

export default CommentCard;
