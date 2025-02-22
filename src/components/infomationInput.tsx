import styled from "styled-components"

interface TitleInputProps {
    value: number;
    name: string;
    subTitle: string;
    width: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InfomationInput = ({ value, name, subTitle, onChange, width }: TitleInputProps) => {

    return (
        <Container $width={width} >
            <Content type="number" name={name} value={value} onChange={onChange} />
            <SubTitle>{subTitle}</SubTitle>
        </Container>
    )
}

const Container = styled.div<{ $width: string }>`
    border: 1px solid ${({ theme }) => theme.brown['04']};
    padding: 12px;
    border-radius: 10px;
    display:flex;
    gap:8px;
    width: ${({ $width }) => `${$width}px`};
`

const Content = styled.input`
    background-color: transparent;
    width:100%;
    outline:none;
`

const SubTitle = styled.p`
    color: ${({ theme }) => theme.gray['01']};
`