import { styled } from 'styled-components'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
}

export const Checkbox = ({ checked, onChange, id }: CheckboxProps) => {
  return (
    <CheckboxLabel id={id}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <CustomCheckbox checked={checked} />
    </CheckboxLabel>
  )
}

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`

const CustomCheckbox = styled.span<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, checked }) => (checked ? theme.brown['04'] : 'transparent')};
  border: 1px solid ${({ theme }) => theme.brown['04']};
  transition: all 0.2s;

  &::before {
    content: '${({ checked }) => (checked ? '✔' : '')}';
    color: white;
    font-size: 8px;
    font-weight: bold;
  }
`
