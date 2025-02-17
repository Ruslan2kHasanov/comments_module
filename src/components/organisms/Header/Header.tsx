import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom';
import UserHeaderContainer from 'components/organisms/UserHeaderContainer/UserHeaderContainer';
import { useGetMeQuery } from '../../../domain/user/userApi';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';
import './index.scss';

const Header = () => {
  const { data: me } = useGetMeQuery();
  return (
    <header className="header">
      <img src={logo} alt="" style={{ maxHeight: '90%' }} />
      {me ? (
        <UserHeaderContainer />
      ) : (
        <Link className="header__auth_link" to={APP_ROUTES.AUTH}>
          Войдите в аккаунт
        </Link>
      )}
    </header>
  );
};
export default Header;
