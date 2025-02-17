import React from 'react';
import { Button } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { useGetMeQuery } from '../../../domain/user/userApi';
import { TComment } from '../../../domain/comment/TComment';
import './index.scss';

interface CommentRatingActionsProps {
  changedRatingByUser?: 1 | -1 | undefined;
  comment: TComment;
}

const CommentRatingActions: React.FC<CommentRatingActionsProps> = ({ comment, changedRatingByUser }) => {
  const { data: me } = useGetMeQuery();
  let ratingValColor = '';

  if (comment.rating !== 0) {
    ratingValColor = comment.rating && comment.rating < 0 ? 'comment_rating__val--bad' : 'comment_rating__val--good';
  }

  return (
    <div className="comment_rating">
      <Button
        disabled={!me?.id || changedRatingByUser === 1}
        title="Поднять рейтинг"
        icon={<CaretUpOutlined />}
        type="link"
      />
      <span className={`comment_rating__val ${ratingValColor}`}>{comment.rating}</span>
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
