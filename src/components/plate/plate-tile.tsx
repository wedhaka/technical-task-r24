import styled from "styled-components"
import { NumberInput } from "../inputs/number-input"
import { useState } from "react";

interface PlateTileProps {
    number: number;
    plateDetails: any;
    handPlateRemove: (index: number) => void;
    handPlateUpdate: (index: number) => void;
}

export const PlateTile = ({number, plateDetails, handPlateRemove, handPlateUpdate}: PlateTileProps) => {

    const [plateValues, setPlateValues] = useState(plateDetails);
    console.log(plateDetails, 'plateValues');

    return (
        <>
            <CardContainer $index={number}>
                <CardBoxContainer>
                    <CardNumber $index={number}>{number + 1}</CardNumber>
                    <CardInputBox> 
                        <NumberInput 
                            number={number} 
                            labelName="widthTitle" 
                            validate={{max: 300, min: 20}}
                            values={plateValues}
                            keyName="width"
                            handleChangeValue={setPlateValues}
                            />
                        <Seperator $index={number}>X</Seperator>
                        <NumberInput 
                            number={number}
                            labelName="heightTitle" 
                            validate={{max: 128, min: 30}}
                            values={plateValues}
                            keyName="height"
                            handleChangeValue={setPlateValues}
                            />
                    </CardInputBox>
                    <CardDeleteBtn $index={number} onClick={() => handPlateRemove(number)}>-</CardDeleteBtn>
                </CardBoxContainer>
            </CardContainer>
        </>
    )
}

const CardContainer = styled.div`
    background-color: #F3F3F3;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 10px;
    padding:  ${(p: any) => p.$bg == 0 ? '5px' : '15px'};
`

const CardBoxContainer = styled.div`
    align-items: end;
    display: flex;
    flex-direction: row;
`

const CardNumber = styled.span`
    background-color: ${(p: any) => p.$index == 0 ? 'white' : 'black'};
    border: 1px solid #000;
    border-radius: 5px;
    color: ${(p: any) => p.$index == 0 ? 'black' : 'white'};
    font-size: 14px;
    height: 15px;
    line-height: 15px;
    margin-bottom:  ${(p: any) => p.$index == 0 ? '2px' : '12px'};
    padding: 5px;
    text-align: center;
    width: 30px;
`

const CardInputBox = styled.div`
    align-items: end;
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
    padding: 0 10px;
`

const Seperator = styled.span`
    color: black;
    height: ${(p: any) => p.$index == 0 ? '30px' : '40px'};
    line-height: ${(p: any) => p.$index == 0 ? '30px' : '40px'};
    margin-bottom:  ${(p: any) => p.$index == 0 ? '0px' : '7px'};
    padding: 0 10px;
    text-align: center;
    width: 20px;
`

const CardDeleteBtn = styled.button`
    background-color: #f3ababff;
    border: 1px solid #e92121ff;
    border-radius: 100px;
    color: red;
    cursor: pointer;
    font-size: 22px;
    height: 20px;
    line-height: 0px;
    margin-bottom:  ${(p: any) => p.$index == 0 ? '5px' : '17px'};
    text-align: left;
    width: 20px;
    '&:hover':  {
        border: 1px solid #ffadadff;
        background-color: #ffadadff;
    }
`