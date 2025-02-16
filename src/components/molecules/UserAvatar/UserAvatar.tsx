import React from 'react';
import './index.scss';
import { getColorByFirstLetter } from '../../../utils/getColorByFirstLetter';

interface UserAvatarProps {
  avatarPath: string | null | undefined;
  title: string;
  avatarSize?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarPath, title, avatarSize }) => {
  const sizeObject = avatarSize ? { height: `${avatarSize}px`, width: `${avatarSize}px` } : {};

  return avatarPath ? (
    <img src={avatarPath} alt={title} loading="lazy" className="user_avatar_img" style={sizeObject} />
  ) : (
    <div className="user_avatar_plug" style={{ background: getColorByFirstLetter(title.at(0)), ...sizeObject }}>
      <span>{title.at(0)}</span>
    </div>
  );
};
export default UserAvatar;
