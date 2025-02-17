import React from 'react';
import styled from 'styled-components';
import { Tab } from './Tab';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = ['main', 'stylist', 'makeup', 'wishlist'];

  return (
    <NavbarStyle>
      {tabs.map(tab => (
        <Tab
          key={tab}
          name={tab}
          isActive={location.pathname === `/${tab}`}
          onClick={() => navigate(`/${tab}`)}
        />
      ))}
    </NavbarStyle>
  );
};

const NavbarStyle = styled.nav`
  display: flex;
  background-color: ${({ theme }) => theme.brown?.['03']};
  width: 100%;
`;
