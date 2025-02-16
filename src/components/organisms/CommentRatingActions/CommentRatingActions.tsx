import React from 'react';
import { Button } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useGetMeQuery } from '../../../domain/user/userApi';
import { TComment } from '../../../domain/comment/TComment';

interface CommentRatingActionsProps {
  changedRatingByUser?: 1 | -1 | undefined;
  comment: TComment;
}

const CommentRatingActions: React.FC<CommentRatingActionsProps> = ({ comment, changedRatingByUser }) => {
  const { data: me } = useGetMeQuery();

  return (
    <div>
      <Button
        disabled={!me?.id || changedRatingByUser === 1}
        title="Поднять рейтинг"
        icon={<CaretUpOutlined />}
        type="link"
      />
      <span
        className={`comment_card__rating${comment.rating < 0 ? ' comment_card__rating--bad' : ' comment_card__rating--good'}`}
      >
        {comment.rating}
      </span>
      <Button
        disabled={!me?.id || changedRatingByUser === -1}
        title="Опустить рейтинг"
        icon={<CaretDownOutlined />}
        type="link"
      />
    </div>
  );
};

export default CommentRatingActions;
