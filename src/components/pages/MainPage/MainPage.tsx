import React from 'react';
import { useGetAllUsersQuery, useGetMeQuery } from '../../../domain/user/userApi';
import { useGetAllCommentsQuery } from '../../../domain/comment/commentsApi';

const MainPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: allComments } = useGetAllCommentsQuery();
  const { data: user } = useGetMeQuery();
  console.log(users);
  console.log(user);
  console.log(allComments);
  return (
    <div>
      <h1>Комментарии к посту</h1>
    </div>
  );
};

export default MainPage;
