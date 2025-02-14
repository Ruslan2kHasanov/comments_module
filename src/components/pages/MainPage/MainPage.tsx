import React from 'react';
import { useGetAllUsersQuery } from '../../../domain/user/userApi';

const MainPage = () => {
  const { data } = useGetAllUsersQuery();
  console.log(data);
  return (
    <div>
      <h1>Комментарии к посту</h1>
    </div>
  );
};

export default MainPage;
