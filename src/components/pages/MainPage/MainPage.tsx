import React from 'react';
import { useGetAllUsersQuery, useGetMeQuery } from '../../../domain/user/userApi';

const MainPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: user } = useGetMeQuery();
  console.log(users);
  console.log(user);
  return (
    <div>
      <h1>Комментарии к посту</h1>
    </div>
  );
};

export default MainPage;
