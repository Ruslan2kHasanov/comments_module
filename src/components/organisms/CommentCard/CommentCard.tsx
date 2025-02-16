import React from 'react';
import './index.scss';
import logo from 'assets/logo.svg';
import { TComment } from '../../../domain/comment/TComment';
import { TUser } from '../../../domain/user/TUser';
import { getFormattedDate } from '../../../utils/getFormattedDate';

// TODO добавить body с типом React.ReactNode, чтобы контролировать контент извне
interface CommentCardProps {
  data: TComment;
  author?: TUser;
  actions?: React.ReactNode;
}

const CommentCard: React.FC<CommentCardProps> = ({ data, author, actions }) => (
  <div className="comment_card">
    <div className="comment_card__heading">
      <img src={author.avatar ?? logo} alt={author.name} loading="lazy" className="comment_card__avatar" />
      <span className="comment_card__name">{author.name}</span>
      <span className="comment_card__date">{getFormattedDate(data.date_create)}</span>
    </div>
    <div className="comment_card__body">
      <span>{data.text}</span>
    </div>
    {!!actions && <div className="comment_card__footer">{actions}</div>}
  </div>
);

export default CommentCard;
