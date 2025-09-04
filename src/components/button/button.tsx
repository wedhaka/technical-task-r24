import styled from "styled-components"

interface ButtonProps {
    align: 'left' | 'center' | 'right',
    handleAddEvent: () => void;
    display: boolean;
}

export const Button = ({align, handleAddEvent, display}: ButtonProps) => {
    return (
        <ButtonAdd $align={align} $display={display} onClick={handleAddEvent}>
            Ruckwand hindzufugen +
        </ButtonAdd>
    )
}

const ButtonAdd = styled.button`
    background-color: #fff;
    border: 1px solid #3abe3aff;
    border-radius: 5px;
    color: #3abe3aff;
    cursor: pointer;
    display: ${(p: any) => p.$display ? 'none' : 'flex'}; 
    font-size: 14px;
    justify-self:  ${(p: any) => p.$align};
    margin-right: 0px;
    padding: 10px 15px;
    '&:focus; &:hover': {
        border: 1px solid #8aec8aff;
        color: #8aec8aff;
    }
`