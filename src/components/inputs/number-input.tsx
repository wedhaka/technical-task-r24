import { useContext, useEffect, useState } from "react"
import { Trans } from "react-i18next";
import styled from "styled-components"
import { parseNumberLocale } from "../../util";
import { PageContext } from "../../App";

interface INumberprops {
    number: number;
    labelName: string;
    validate: any;
    values: any;
    keyName: string;
    handleChangeValue: any;
}

export const NumberInput = ({number, labelName, values, keyName, validate, handleChangeValue } : INumberprops) => {

    const [ isValidate, setIsValidate ] = useState<boolean>(false);
    const [ fieldValue, setFieldValue ] = useState(values);
    const { lang, dimens } = useContext(PageContext);

    useEffect(() => {
        validateValue();
    }, [fieldValue])

    const valueChangeListner = (e: any) => {
        let getNumOnly = e.target.value.replace(/[^0-9]/g, "");
        setFieldValue({...fieldValue, [keyName]: getNumOnly });
    }

    const validateValue = () => {
        if(dimens === 'cm' && (fieldValue[keyName] && validate.max >= fieldValue[keyName]) && (fieldValue[keyName] && validate.min <= fieldValue[keyName]) ) { 
            setIsValidate(false);
            handleChangeValue({...values, [keyName]: parseInt(fieldValue[keyName])})
        } else if(dimens === 'inch' && (fieldValue[keyName] && validate.max >= fieldValue[keyName]) && (fieldValue[keyName] && validate.min <= fieldValue[keyName]) ) { 
            setIsValidate(false);
            handleChangeValue({...values, [keyName]: parseInt(fieldValue[keyName])})
        } else if( fieldValue[keyName] === 0 || fieldValue[keyName] === undefined )
            setIsValidate(false)
        else
            setIsValidate(true);
    }

    return (
        <InputContainer>
            <TextLabel $index={number}>
                <Trans>{labelName}</Trans><SpanLabel>{validate.min} - {validate.max} cm</SpanLabel>
            </TextLabel>
            <InputGroup>
                <TextInput type="text" onChange={(e) => valueChangeListner(e)} value={fieldValue[keyName]} $index={number}/>
                <Types>{ dimens }</Types>
            </InputGroup>
            <InfoContainer $index={number}>
                <InfoLabel $bg='red' $isValid={isValidate} $value={fieldValue[keyName]} $align="left">min {validate.min} {dimens} and max {validate.max} {dimens}</InfoLabel>
                <InfoLabel $bg='black' $isValid={!isValidate} $value={fieldValue[keyName]} $align="center">{ parseNumberLocale((fieldValue[keyName] * 10), lang) } mm</InfoLabel>
            </InfoContainer>
        </InputContainer>
    )
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    bottom: -3px;
`

const InfoContainer = styled.div`
    display: ${(p: any) => p.$index == 0 ? 'none' : 'flex'};
    flex-direction: column;
    height: 10px;
`

const InfoLabel = styled.span`
    font-size: 60%;
    position: relative;
    color: ${(p: any) => p.$bg};
    text-align: ${(p: any) => p.$align};
    width: 100%;
    display: ${(p: any) => p.$bg !== 0 && p.$isValid ? 'block' : 'none'};
    margin-bottom: -30px;
`