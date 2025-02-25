import { Button, notification } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CommentCard from 'components/organisms/CommentCard/CommentCard';
import './index.scss';
import CommentRatingActions from 'components/organisms/CommentRatingActions/CommentRatingActions';
import { CommentCollapsedBody } from 'components/molecules/CommentCollapsedBody/CommentCollapsedBody';
import { TComment, TCommentsUserChanged } from '../../../domain/comment/TComment';
import { TUser } from '../../../domain/user/TUser';
import { useGetMeQuery } from '../../../domain/user/userApi';
import { MIN_RATING_WHEN_COLLAPSED } from '../../../utils/consts/appConsts';
import { useDeleteCommentMutation } from '../../../domain/comment/commentsApi';

interface CommentsListProps {
  comments: TComment[];
  changedComments?: TCommentsUserChanged[] | undefined | null;
  users: TUser[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, users, changedComments }) => {
  const { data: me } = useGetMeQuery();
  const [api, contextHolder] = notification.useNotification();

  const [deleteComment] = useDeleteCommentMutation();

  const onDeleteComment = useCallback(
    async (id: string) => {
      try {
        await deleteComment(id).unwrap();
        api.success({
          message: 'Ваш комментарий удален!',
        });
      } catch (e) {
        console.error(e);
      }
    },
    [api, deleteComment],
  );

  const commentsToDisplay = useMemo(
    () =>
      comments.map((el) => {
        const foundedChangedComment = changedComments?.find((comment) => comment.id_comment === el.id);
        return (
          <CommentCard
            data={el}
            key={el?.id}
            author={users?.find((user) => user.id === el.author_id)}
            body={el.rating <= MIN_RATING_WHEN_COLLAPSED ? <CommentCollapsedBody text={el.text} /> : el.text}
            actions={
              el.author_id !== me?.id ? (
                <CommentRatingActions comment={el} changedRatingByUser={foundedChangedComment?.rating_val} />
              ) : (
                <>
                  <Button title="Редактировать" icon={<EditOutlined />} type="link" />
                  <Button
                    title="Удалить"
                    icon={<DeleteOutlined />}
                    type="link"
                    danger
                    onClick={() => onDeleteComment(el.id)}
                  />
                </>
              )
            }
          />
        );
      }),
    [changedComments, comments, me?.id, onDeleteComment, users],
  );

  return (
    <div className="comment_list">
      <h3 className="comment_list__title">Комментарии</h3>
      {commentsToDisplay ? <div className="comment_list__items">{commentsToDisplay}</div> : 'Комментариев пока нет'}
      {contextHolder}
    </div>
  );
};

export default CommentsList;
