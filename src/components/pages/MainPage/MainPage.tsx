import React from 'react';
import CommentsList from 'components/templates/CommentsList/CommentsList';
import { useGetAllUsersQuery } from '../../../domain/user/userApi';
import { useGetAllCommentsQuery, useGetChangedCommentsQuery } from '../../../domain/comment/commentsApi';
import './index.scss';

const MainPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: allComments } = useGetAllCommentsQuery();
  const { data: changedComments } = useGetChangedCommentsQuery();

  return (
    <div className="page_wrapper">
      <h1>Комментарии к посту</h1>
      <CommentsList comments={allComments ?? []} users={users ?? []} changedComments={changedComments} />
    </div>
  );
};

export default MainPage;
