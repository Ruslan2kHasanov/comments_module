import React from 'react';
import './index.scss';

const AuthsPageLayout: React.FC<{ children: React.ReactNode; img: string }> = ({ children, img }) => (
  <div className="auth_page">
    <div className="auth_page__layout">
      <div className="auth_page__layout__image_container">
        <img src={img} alt="" />
      </div>
      <div className="auth_page__layout__form">{children}</div>
    </div>
  </div>
);

export default AuthsPageLayout;
