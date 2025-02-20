import React, { useRef } from 'react';
import styled from 'styled-components';
import { Search } from '../assets';

interface ChangeProps {
  text: string;
  name: string;
}

interface InputProp {
  placeholder?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  name?: string;
  value: string;
}

export const SearchInput = ({
  placeholder,
  name = '',
  onChange,
  value,
}: InputProp) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange({ text: inputValue, name: e.target.name });
  };


  return (
    <InputContainer>
      <SearchInputContainer
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
      <img src={Search} alt="Icon" width={36} />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 476px;
  height: 48px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 7px;
  box-sizing: border-box;
`;

const SearchInputContainer = styled.input`
  display: flex;
  border: none;
  width: 100%;
  ::placeholder {
    font-size: 20px;
    color: ${({ theme }) => theme.brown['04']};
  }
  font-size:20px;
  &:hover {
    outline: none;
  }
  outline: none;
  caret-color: ${({ theme }) => theme.brown['04']};
`;
