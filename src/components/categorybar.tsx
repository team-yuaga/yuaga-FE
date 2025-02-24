import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CategoryTab } from './categoryTab';

interface CategorybarProps {
  tabs: string[];
  onTabChange?: (tab: string) => void;
}

export const Categorybar = ({ tabs, onTabChange }: CategorybarProps) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "모두"); // 기본값 설정

  useEffect(() => {
    if (tabs.length > 0) {
      const firstTab = tabs[0] || "모두";
      setActiveTab(firstTab);
      onTabChange?.(firstTab);
    }
  }, [tabs]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <CategorybarStyle>
      {tabs.map(tab => (
        <CategoryTab
          key={tab}
          name={tab}
          isActive={activeTab === tab}
          onClick={() => handleTabClick(tab)}
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
