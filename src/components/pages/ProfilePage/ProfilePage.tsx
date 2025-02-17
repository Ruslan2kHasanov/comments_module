import React from 'react';
import ChangeUserForm from 'components/organisms/ChangeUserForm/ChangeUserForm';
import './index.scss';
import UploadUserAvatarForm from 'components/organisms/UploadUserAvatarForm/UploadUserAvatarForm';

const ProfilePage = () => (
  <div className="profile_page">
    <h1>Профиль</h1>
    <UploadUserAvatarForm />
    <ChangeUserForm />
  </div>
);

export default ProfilePage;
