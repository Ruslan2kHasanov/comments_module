import { Button } from 'antd';
import React, { useMemo } from 'react';
import CommentCard from 'components/organisms/CommentCard/CommentCard';
import { TComment, TCommentsUserChanged } from '../../../domain/comment/TComment';
import './index.scss';
import { TUser } from '../../../domain/user/TUser';
import { useGetMeQuery } from '../../../domain/user/userApi';

interface CommentsListProps {
  comments: TComment[];
  changedComments?: TCommentsUserChanged[] | undefined | null;
  users: TUser[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, users, changedComments }) => {
  const { data: me } = useGetMeQuery();

  const commentsToDisplay = useMemo(
    () =>
      comments.map((el) => {
        const foundedChangedComment = changedComments?.find((comment) => comment.id_comment === el.id);
        return (
          <CommentCard
            data={el}
            key={el?.id}
            author={users?.find((user) => user.id === el.author_id)}
            actions={
              <>
                <Button disabled={!me?.id || foundedChangedComment?.rating_val === 1} title="Поднять рейтинг">
                  UP
                </Button>
                <span className={`comment_card__rating${el.rating < 0 ? '--bad' : '--good'}`}>{el.rating}</span>
                <Button disabled={!me?.id || foundedChangedComment?.rating_val === -1} title="Опустить рейтинг">
                  DOWN
                </Button>
              </>
            }
          />
        );
      }),
    [changedComments, comments, me?.id, users],
  );

  return (
    <div className="comment_list">
      <h3 className="comment_list__title">Комментарии</h3>
      {commentsToDisplay ? <div className="comment_list__items">{commentsToDisplay}</div> : 'Комментариев пока нет'}
    </div>
  );
};

export default CommentsList;
