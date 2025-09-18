import styled from "styled-components"
import { NumberInput } from "../inputs/number-input"
import { memo, useRef, useState } from "react";

interface PlateTileProps {
    number: number;
    plateDetails: any;
    handPlateRemove: (index: number) => void;
    handPlateUpdate: (index: number, values: object) => void;
    handleUpdateNoteOrder: (oldIndex: number, newIndex: number) => void;
}

const PlateTile = ({number, plateDetails, handPlateRemove, handPlateUpdate, handleUpdateNoteOrder}: PlateTileProps) => {

    const [plateValues, setPlateValues] = useState(plateDetails);
    const selfRef = useRef<HTMLDivElement>(null);
    const [isMoving, setIsMoving] = useState<boolean>(false);

    let post1 = 0;
    let post2 = 0;
    let mEy = 0;

    const updateFieldHander = (plate: any) => {
        setPlateValues(plate);
        handPlateUpdate(number, plate);
    }

    /*
     * Mouse Event as mouse down trigger listner here
     * Listning the Mousemove event and pass the method into it
     */
    const mouseDown = (e: any) => {
        post2 = e.clientY;
        mEy = e.pageY;

        if (!selfRef.current) return;
        selfRef.current.style.zIndex = '100';
        selfRef.current.style.top = e.scrollY + 'px';
        document.onmousemove = mouseMove;
        document.ontouchmove = mouseMove;
    }
    
    
    /*
     * MouseMove Listning here
     * Collecting the move direction of Mouse and changing the element params
     * Remove the Element from position and replace with moved position
     */
    const mouseMove = (e: any) => {
        e.preventDefault();
        let isOverlapedPrev = false;
        let isOverlapedNext = false;
        post1 = post2 - e.clientY;
        post2 = e.clientY;
        // setMeY(prev => prev = e.pageY);
        setIsMoving(true);

        if (!selfRef.current) return;
        selfRef.current.style.top = (selfRef.current.offsetTop - post1) + "px";

        const previousSibling = selfRef.current.previousSibling;
        const nextSibling = selfRef.current.nextSibling;

        if( previousSibling !== null && mEy > e.pageY) {
            isOverlapedPrev = elementsOverlapPrev(selfRef, previousSibling);
            if(isOverlapedPrev) {
                let siblingTop = previousSibling?.dataset.top;
                let currentTop = parseInt(selfRef.current.dataset.top);
                selfRef.current?.parentNode?.insertBefore(selfRef.current, previousSibling);
                previousSibling.style.top = currentTop + 'px';
                previousSibling.dataset.top = currentTop;
                selfRef.current.dataset.top = siblingTop;
            }
        } else if (nextSibling !== null && mEy < e.pageY) {
            isOverlapedNext = elementsOverlapNext(selfRef, nextSibling);
            if(isOverlapedNext) {
                let siblingTop = nextSibling.dataset.top;
                let currentTop = parseInt(selfRef.current.dataset.top);
                selfRef.current?.parentNode?.insertBefore(selfRef.current, nextSibling.nextSibling);
                nextSibling.style.top = currentTop + 'px';
                nextSibling.dataset.top = currentTop;
                selfRef.current.dataset.top = siblingTop;
            }
        }
    }

    /*
     * Mouse Event as mouse up trigger listner here
     * Removing all Listners from document Object
     * Upldate the main PlateList from Element update
     */
    const mouseLeave = (e: any) => {
        e.preventDefault();

        if (!selfRef.current) return;
        selfRef.current.style.zIndex = '10';

        // Destroy the mouse events
        document.onmousemove = null;
        document.onmousedown = null;

        let newIndex = 0;
        if (selfRef.current == null) return;
        selfRef.current.parentNode?.childNodes.forEach((element, i) => {
            if(element == selfRef.current) newIndex = i;
        });
        setIsMoving(false);
        handleUpdateNoteOrder(number, newIndex);
    }

    const elementsOverlapPrev = (el1:any, el2:any) => {

        const domRect1 = el1.current.getBoundingClientRect();
        const domRect2 = el2?.getBoundingClientRect();

        return !(
            (domRect1.top - 55) > domRect2.top
        );
    }

    const elementsOverlapNext = (el1:any, el2:any) => {

        const domRect1 = el1.current.getBoundingClientRect();
        const domRect2 = el2?.getBoundingClientRect();

        return !(
            domRect1.bottom < (domRect2.bottom - 55)
        );
    }

    return (
        <>
            <CardContainer 
                $index={number}
                $order={number}
                ref={selfRef}
                $isMoving={isMoving}
                data-top={`${number == 0 ? 0 : number == 1 ? 68 : number*100-32 }`}
                >
                <CardBoxContainer>
                    <CardNumber 
                        $index={number}
                        onMouseDown={(e:any) => mouseDown(e)} 
                        onMouseUp={(e:any) => mouseLeave(e)} 
                        onTouchStart={(e:any) => mouseDown(e)}
                        onTouchEnd={(e:any) => mouseLeave(e)}
                        >{number + 1}</CardNumber>
                    <CardInputBox> 
                        <NumberInput 
                            number={number} 
                            labelName="widthTitle" 
                            validate={{max: 300, min: 20}}
                            values={plateValues}
                            keyName="width"
                            handleChangeValue={updateFieldHander}
                            />
                        <Seperator $index={number}>X</Seperator>
                        <NumberInput 
                            number={number}
                            labelName="heightTitle" 
                            validate={{max: 128, min: 30}}
                            values={plateValues}
                            keyName="height"
                            handleChangeValue={updateFieldHander}
                            />
                    </CardInputBox>
                    <CardDeleteBtn $index={number} onClick={() => handPlateRemove(number)} onTouchStart={() => handPlateRemove(number)} type="button">-</CardDeleteBtn>
                </CardBoxContainer>
            </CardContainer>
        </>
    )
}

export default memo(PlateTile);


const CardContainer = styled.div`
    background-color: #F3F3F3;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: 0px;
    padding:  ${(p: any) => p.$bg == 0 ? '5px' : '15px'};
    position: absolute;
    z-index: 9;
    top: ${(p: any) => p.$index == 0 ? 0 : p.$index == 1 ? 68 : p.$index*100-32 }px;
    width: calc(100% - 30px);
    
`

const CardBoxContainer = styled.div`
    align-items: end;
    display: flex;
    flex-direction: row;
    position: relative;
`

const CardNumber = styled.span`
    background-color: ${(p: any) => p.$index == 0 ? 'white' : 'black'};
    border: 1px solid #000;
    border-radius: 5px;
    color: ${(p: any) => p.$index == 0 ? 'black' : 'white'};
    cursor: move;
    font-size: 14px;
    height: 15px;
    line-height: 15px;
    margin-bottom:  ${(p: any) => p.$index == 0 ? '2px' : '12px'};
    padding: 5px;
    text-align: center;
    width: 30px;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
`

const CardInputBox = styled.div`
    align-items: end;
    display: flex;
    flex-direction: row;
    margin-bottom: 0px;
    padding: 0 10px;
    justify-content: space-between;
    width: 100%;
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
    pointer-events:  ${(p: any) => p.$index == 0 ? 'none' : 'auto'};
    text-align: left;
    width: 20px;
    '&:hover':  {
        border: 1px solid #ffadadff;
        background-color: #ffadadff;
    }
`