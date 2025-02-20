import styled from "styled-components"

interface TitleInputProps {
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleInput = ({ value, name, onChange }: TitleInputProps) => {
    const currentLength = value.length;
    return (
        <Container>
            <Content type="text" name={name} value={value} onChange={onChange} />
            <Count>{currentLength}/100</Count>
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid ${({ theme }) => theme.brown['04']};
    padding: 16px 12px;
    border-radius: 10px;
    display:flex;
    gap:8px;
    width:100%
`

const Content = styled.input`
    background-color: transparent;
    width:100%;
    outline:none;
`

const Count = styled.p`
    color: ${({ theme }) => theme.gray['02']}
`