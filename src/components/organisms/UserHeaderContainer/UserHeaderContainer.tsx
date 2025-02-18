import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import UserAvatar from 'components/molecules/UserAvatar/UserAvatar';
import { Link, useNavigate } from 'react-router-dom';
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useGetMeQuery, userApi } from '../../../domain/user/userApi';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';
import { LOCAL_STORAGE_TOKEN } from '../../../utils/consts/appConsts';

const UserHeaderContainer = () => {
  const { data: me } = useGetMeQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, '');
    navigate(APP_ROUTES.AUTH);
    dispatch(userApi.util.resetApiState());
  };

  const userActionItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={APP_ROUTES.PROFILE}>Профиль</Link>,
      icon: <ProfileOutlined />,
    },
    {
      key: '2',
      label: <span>Выйти</span>,
      icon: <LoginOutlined />,
      onClick: logout,
    },
  ];

  return (
    <Dropdown menu={{ items: userActionItems }} placement="bottomLeft" trigger={['click']}>
      <div className="header__user">
        <UserAvatar avatarPath={me.avatar} title={me.name} />
        {me.email}
      </div>
    </Dropdown>
  );
};

export default UserHeaderContainer;
