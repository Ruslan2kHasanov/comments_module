import React from 'react';
import './index.scss';
import UserAvatar from 'components/molecules/UserAvatar/UserAvatar';
import { TComment } from '../../../domain/comment/TComment';
import { TUser } from '../../../domain/user/TUser';
import { getFormattedDate } from '../../../utils/getFormattedDate';

interface CommentCardProps {
  data: TComment;
  author?: TUser | null;
  actions?: React.ReactNode;
  body: React.ReactNode;
}

const CommentCard: React.FC<CommentCardProps> = ({ data, author, actions, body }) => (
  <div className="comment_card">
    <div className="comment_card__heading">
      {author && <UserAvatar avatarPath={author.avatar} title={author.name} />}
      <span className="comment_card__name">{author?.name}</span>
      <span className="comment_card__date">{getFormattedDate(data.date_create)}</span>
    </div>
    <div className="comment_card__body">{body}</div>
    {!!actions && <div className="comment_card__footer">{actions}</div>}
  </div>
);

export default CommentCard;
