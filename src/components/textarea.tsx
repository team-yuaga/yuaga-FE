import styled from "styled-components";

interface TextareaProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaComponent = ({ name, value, onChange }: TextareaProps) => {
    const currentLength = value.length;
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 700) {
            onChange(e);
        }
    };
    return (
        <TextareaContainer><Textarea name={name} value={value} onChange={handleChange} /><Count >{currentLength}/700</Count></TextareaContainer>
    )
}

const TextareaContainer = styled.div`
    width: 100%;
    height: 267px;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.brown['04']};
    margin-top:16px;
`;

const Textarea = styled.textarea`
    background-color: transparent;
    width:100%;
    height:90%;
    outline:none;
    resize:none;
`

const Count = styled.p`
    display:flex;
    justify-self: end;
    color: ${({ theme }) => theme.gray['02']}
`