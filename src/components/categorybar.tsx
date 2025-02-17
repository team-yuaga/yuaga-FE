import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CategoryTab } from './categoryTab';

interface CategorybarProps {
  tabs: string[]
}

export const Categorybar = ({ tabs }: CategorybarProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "");

  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [tabs]);

  return (
    <CategorybarStyle>
      {tabs.map(tab => (
        <CategoryTab
          key={tab}
          name={tab}
          isActive={activeTab === tab}
          onClick={() => setActiveTab(tab)}
        />
      ))}
    </CategorybarStyle>
  );
};

const CategorybarStyle = styled.nav`
  display: flex;
  width: 100%;
  gap: 20px;
`;