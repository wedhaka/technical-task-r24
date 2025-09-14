import { useEffect, useState } from "react";
import PlateTile from "../plate/plate-tile";
import { Button } from "../button/button";
import styled from "styled-components";


export const PanelCard = () => {

    const [ plateList, setPlateList ] = useState([{
        width: 230,
        height: 128,
        img: ''
    }]);

    const handleAddNewPlateToList = () => {
        setPlateList( prev => [
            ...prev, 
            {
                width: 0,
                height: 0,
                img: ''
            }
        ]);
    }

    const handleRemovePlateFromList = (index: number) => {
        setPlateList(prev => prev.filter((_, i) => i !== index));
    }

    const handleUpdatePlateFromList = (index: number, values: any) => {
        const updatedPlateList = plateList.filter((item, i) => {
            if( index == i ) {
                item.height = values.height;
                item.width = values.width;
            }
            return item;
        });
        setPlateList(updatedPlateList);
    }

    const handleUpdateNoteOrder = (oldIndex: number, newIndex: number) => {

        let updatedPlate = plateList[oldIndex];
        let updatedPlateList = plateList.filter((_, i) => i !== oldIndex);

        updatedPlateList.splice(newIndex, 0, updatedPlate);
        setPlateList([...updatedPlateList]);
    }

    const PlateTileList = (newPlateList: any) => {
        return (
            newPlateList.map((plate: any, index: number) => 
                <PlateTile 
                    plateDetails={plate} 
                    number={index} 
                    handPlateRemove={() => handleRemovePlateFromList(index)} 
                    handPlateUpdate={handleUpdatePlateFromList} 
                    handleUpdateNoteOrder={handleUpdateNoteOrder}
                    key={plate?.width + plate?.height + index}
                    />
            )
        )
    }
    
    return (
        <>
            <DragnDropBox $legnth={plateList.length}>
                { PlateTileList(plateList) }
            </DragnDropBox>
            <Button align={'right'} handleAddEvent={handleAddNewPlateToList} display={plateList.length === 10} />
        </>
    );
}

const DragnDropBox = styled.div`
    display: flex;
    align-item: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: ${(p: any) => p.$legnth*100-32 }px;
    max-height: 600px;
    opacity: 1;
    background-color: transparent;
    overflow: hidden;
    top: 0px;
`

