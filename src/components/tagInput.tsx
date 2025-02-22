import styled from "styled-components";
import React from "react";

interface TagInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onClick: () => void;
    data: string[];
    handleRemoveTag: (index: number) => void;
}

export const TagInputComponent = ({ value, onChange, onKeyPress, data, handleRemoveTag, onClick }: TagInputProps) => {
    const currentLength = value.length;
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 10) {
            onChange(e);
        }
    };

    return (
        <div>
            <TagInputContainer>
                <TagInputContent>
                    <TagInput
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        onKeyPress={onKeyPress}
                        placeholder="태그를 입력하세요"
                    />
                    <Count>{currentLength}/10</Count>
                </TagInputContent>
                <AddTagButton onClick={onClick}>+</AddTagButton>
                <Text>태그는 최대 4개를 추가할 수 있습니다</Text>
            </TagInputContainer>
            <TagContainer>
                {data.map((tag, index) => (
                    <Tag key={index}>
                        {tag} <RemoveTagButton onClick={() => handleRemoveTag(index)}>&times;</RemoveTagButton>
                    </Tag>
                ))}
            </TagContainer>
        </div>
    );
}

const Text = styled.p`
    font-size:17px;
    color: ${({ theme }) => theme.gray['01']}
`

const TagInputContent = styled.div`
width:332px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    background-color: transparent;
    border-bottom: 2px solid ${({ theme }) => theme.brown['04']};
    padding:4px 8px;
`

const TagInputContainer = styled.div`
    display:flex;
    align-items:center;
    gap:16px;
    margin-left: 12px;
`

const TagInput = styled.input`
    outline: none;
    background-color: transparent;
    font-size: 16px;
    width:100%;
`;

const Count = styled.p`
    color: ${({ theme }) => theme.gray['02']};
    margin-top: 4px;
`;

const AddTagButton = styled.div`
    margin-top: 8px;
    cursor: pointer;
    font-size: 24px;
    color: ${({ theme }) => theme.brown['04']};
`;

const TagContainer = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
`;

const Tag = styled.span`
    padding: 8px 13px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 17px;
    border: 1.5px solid ${({ theme }) => theme.brown['04']}
`;

const RemoveTagButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: ${({ theme }) => theme.brown['04']};
`;
