import { useContext } from "react";
import { PageContext } from "../../App";
import styled from "styled-components";
import { selectDimensBtn } from "../../util";

export const DimensToggleBtn = () => {
    
    const {dimens, setDimens} = useContext(PageContext);

    return (
        <>
            <ToggleEl>
                <ToggleBtn onClick={() => setDimens('cm')} $isactive={selectDimensBtn('cm', dimens)}>cm</ToggleBtn>
                <ToggleBtn onClick={() => setDimens('inch')} $isactive={selectDimensBtn('inch', dimens)}>inch</ToggleBtn>
            </ToggleEl>
        </>
    )
}

const ToggleEl = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
`

const ToggleBtn = styled.button`
    background-color: ${(p: any) => p.$isactive ? '#000' : '#E9E9E9' };
    border: 1px solid #000;
    border-radius: 5px;
    color: ${(p: any) => p.$isactive ? '#FFF' : '#000' };
    cursor: pointer;
    font-size: 11px;
    line-height: 25px;
    margin-right: 5px;
    padding: 2px 6px;
    text-align: center;
    width: auto;
`