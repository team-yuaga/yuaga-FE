import React from 'react'
import styled from 'styled-components';

interface CategoryTab {
  name: string
  isActive: boolean
  onClick: () => void
}

export const CategoryTab = ({ name, isActive, onClick }: CategoryTab) => {
  return (
    <CategoryTabStyle
      onClick={onClick}
      isActive={isActive}
    >
      {name}
    </CategoryTabStyle>
  );
};

const CategoryTabStyle = styled.div<{ isActive: boolean }>`
display: flex;
    justify-content: center;
    align-items: center;
 width:109px;
 height: 38px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ theme }) => theme.brown['04']};
  border: 1.5px solid ${({ theme, isActive }) => (
    isActive ? theme.brown['04'] : theme.white
  )};
  background-color: ${({ theme }) => theme.white};
  border-radius: 20px;
`