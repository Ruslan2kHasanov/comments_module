import logo from 'assets/logo.svg';

const Header = () => (
  <header
    style={{
      backgroundColor: '#202020',
      height: '7dvh',
      width: '100%',
      padding: '0px 20px',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <img src={logo} alt="" style={{ maxHeight: '90%' }} />
  </header>
);
export default Header;
