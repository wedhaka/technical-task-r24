import { useEffect, useState } from "react"
import { Trans } from "react-i18next";
import styled from "styled-components"

interface INumberprops {
    number: number;
    labelName: string;
    validate: any;
    values: any;
    keyName: string;
    handleChangeValue: any;
}

export const NumberInput = ({number, labelName, values, keyName, validate, handleChangeValue } : INumberprops) => {

    const [ value, setValue ] = useState(values[keyName]);
    const [ isValidate, setIsValidate ] = useState<boolean>(false);

    const valueChangeListner = (e: any) => {
        let getNumOnly = e.target.value.replace(/[^0-9]/g, "");
        validateValue();
        setValue(getNumOnly);
        handleChangeValue({...values, [keyName]: getNumOnly})
    }

    const validateValue = () => {
        if((value && validate.max >= value) && (value && validate.min <= value) ) 
            setIsValidate(true);
        else if( value === 0 || value === undefined )
            setIsValidate(true)
        else
            setIsValidate(false);
    }

    return (
        <InputContainer>
            <TextLabel $index={number}>
                <Trans>{labelName}</Trans><SpanLabel>{validate.min} - {validate.max} cm</SpanLabel>
            </TextLabel>
            <InputGroup>
                <TextInput type="text" onChange={(e) => valueChangeListner(e)} value={value} $index={number}/>
                <Types>cm</Types>
            </InputGroup>
            <InfoContainer $index={number}>
                <InfoLabel $bg='red' $isValid={isValidate} $value={value} $align="left">min {validate.min}px and max {validate.max}px</InfoLabel>
                <InfoLabel $bg='black' $isValid={!isValidate} $value={value} $align="center">{ value * 10 } mm</InfoLabel>
            </InfoContainer>
        </InputContainer>
    )
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const TextLabel = styled.label`
    color: black;
    display: ${(p: any) => p.$index == 0 ? 'none' : 'flex'};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 1px;
`

const SpanLabel = styled.span`
    color: black;
    font-size: 70%;
`

const InputGroup = styled.div`
    border: 1px solid #CCC;
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    background-color: white;
    align-items: center;
    line-height: 40px;
    position: relative;
`

const TextInput = styled.input`
    border: 0px;
    border-radius: 5px;
    color: black;
    font-size: ${(p: any) => p.$index == 0 ? '11px' : '16px'};
    font-weight: 600;
    height: ${(p: any) => p.$index == 0 ? '18px' : '20px'};
    margin: 0;
    padding: 5px 10px;
    padding-right: 40px;
    text-align: center;
    width: 100%;
`

const Types = styled.span`
    font-size: 90%;
    position: absolute;
    right: 10px;
    color: black;
`

const InfoContainer = styled.div`
    display: ${(p: any) => p.$index == 0 ? 'none' : 'flex'};
    flex-direction: column;
    height: 10px;
`

const InfoLabel = styled.span`
    font-size: 70%;
    position: relative;
    color: ${(p: any) => p.$bg};
    text-align: ${(p: any) => p.$align};
    width: 100%;
    display: ${(p: any) => p.$bg !== 0 && p.$isValid ? 'block' : 'none'};
    margin-bottom: -30px;
`