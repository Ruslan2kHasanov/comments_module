import React from 'react';
import CommentsList from 'components/templates/CommentsList/CommentsList';
import { useGetAllUsersQuery } from '../../../domain/user/userApi';
import { useGetAllCommentsQuery } from '../../../domain/comment/commentsApi';

const MainPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: allComments } = useGetAllCommentsQuery();

  return (
    <div>
      <h1>Комментарии к посту</h1>
      <CommentsList comments={allComments ?? []} users={users ?? []} />
    </div>
  );
};

export default MainPage;
