import React from 'react'
import styled from 'styled-components';

interface TabProps {
  name: string
  isActive: boolean
  onClick: () => void
}

export const Tab = ({ name, isActive, onClick }: TabProps) => {
  return (
    <TabStyle
      onClick={onClick}
      isActive={isActive}
    >
      {name}
    </TabStyle>
  );
};


const TabStyle = styled.div<{ isActive: boolean }>`
  padding: 12px 36px;
  cursor: pointer;
  font-size: 30px;
  background-color: ${({ theme, isActive }) => (
    isActive ? theme.brown['01'] : theme.brown['03']
  )};
`