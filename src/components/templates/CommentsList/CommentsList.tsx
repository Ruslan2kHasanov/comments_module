import React, { useMemo } from 'react';
import CommentCard from 'components/organisms/CommentCard/CommentCard';
import { TComment } from '../../../domain/comment/TComment';
import './index.scss';
import { TUser } from '../../../domain/user/TUser';

interface CommentsListProps {
  comments: TComment[];
  users: TUser[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, users }) => {
  const commentsToDisplay = useMemo(
    () =>
      comments.map((el) => (
        <CommentCard data={el} key={el.id} author={users.find((user) => user.id === el.author_id)} />
      )),
    [comments, users],
  );

  return (
    <div className="comment_list">
      <h3 className="comment_list__title">Комментарии</h3>
      {commentsToDisplay ? <div className="comment_list__items">{commentsToDisplay}</div> : 'Комментариев нет'}
    </div>
  );
};

export default CommentsList;
