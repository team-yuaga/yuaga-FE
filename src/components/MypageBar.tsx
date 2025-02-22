import React from 'react';
import styled from 'styled-components';
import { Tab } from './Tab';
import { useNavigate, useLocation } from 'react-router-dom';

export const MypageNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = ['profile', 'mypost'];
    const query = new URLSearchParams(location.search);
    const activeTab = query.get('tab');

    return (
        <NavbarStyle>
            {tabs.map(tab => (
                <Tab
                    key={tab}
                    name={tab}
                    $isActive={activeTab === tab}
                    onClick={() => navigate(`/mypage?tab=${tab}`)}
                />
            ))}
        </NavbarStyle>
    );
};

const NavbarStyle = styled.nav`
  display: flex;
  background-color: ${({ theme }) => theme.brown?.['03']};
  width: 100%;
  position: fixed;
  top: 74px;
`;
