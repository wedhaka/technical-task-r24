import { useState } from "react";
import PlateTile from "../plate/plate-tile";
import { Button } from "../button/button";
import styled from "styled-components";
import { Trans } from "react-i18next";
import { PlateCanvasPattern } from "./plate-canvas";


export const PanelCard = () => {

    

    const [ plateList, setPlateList ] = useState([{
        width: 230,
        height: 128,
        img: './public/Kuechenrueckwand-Kuechenrueckwand-Gruene-frische-Kraeuter-KR-01.webp',
        id: 1
    }]);

    const handleAddNewPlateToList = () => {
        let getLenth = plateList.length;
        setPlateList( prev => [
            ...prev, 
            {
                width: 230,
                height: 128,
                img: `./public/Kuechenrueckwand-Kuechenrueckwand-Gruene-frische-Kraeuter-KR-0${getLenth+1}.webp`,
                id: getLenth+1
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

    const PlateTileList = () => {
        return (
            plateList.map((plate: any, index: number) => 
                <PlateTile 
                    plateDetails={plate} 
                    number={index} 
                    handPlateRemove={() => handleRemovePlateFromList(index)} 
                    handPlateUpdate={handleUpdatePlateFromList} 
                    handleUpdateNoteOrder={handleUpdateNoteOrder}
                    key={plate.id}
                    />
            )
        )
    }

    console.log(plateList, 'plateList');

    
    return (
        <>
            <PlateContainer>
                <PlateBoxContainer>
                    <PlatePanel $flex="2" $bg="#F00">
                        <LeftBox>   
                            <PlateCanvasPattern plateList={plateList}/>
                        </LeftBox>
                    </PlatePanel>
                    <PlatePanel $flex="1" $bg="#FFF">
                        <RightBox>
                            <Title><Trans>title</Trans></Title>
                            <DragnDropBox $legnth={plateList.length}>
                                { PlateTileList() }
                            </DragnDropBox>
                            <Button align={'right'} handleAddEvent={handleAddNewPlateToList} display={plateList.length === 10} />
                        </RightBox>
                    </PlatePanel>
                </PlateBoxContainer>
            </PlateContainer>
        </>
    );
}

const PlateContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const PlateBoxContainer = styled.div`
    background-color: #ff0;
    display: flex;
    flex-direction: row;
    width: 100%;
`

const PlatePanel = styled.div`
    background-color: ${(p: any) => p.$bg};
    flex: ${(p: any) => p.$flex};
    max-width: 100%;
`

const LeftBox = styled.div`
    background-color: #F3F3F3;
    border: 1px solid #CCC;
    height: 600px;
    max-width: 100%;
`

const RightBox = styled.div `
    background-color: #FFF;
    border: 1px solid #FFF;
    height: 600px;
    max-width: 100%;
    overflow-y: hidden;
    padding-right: 10px;
    margin-left: 40px;
    scroll-behavior: smooth;
`

const Title = styled.p`
    background-color: white;
    color: black;
    font-size: 20px;
    margin: 0;
    padding: 0 15px 15px 15px;
    position: sticky;
    top: 0px;
    z-index: 102;
`

const DragnDropBox = styled.div`
    display: flex;
    align-item: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: ${(p: any) => p.$legnth < 6 ? p.$legnth*100-32 : 5*100 }px;
    max-height: 600px;
    opacity: 1;
    background-color: transparent;
    top: 0px;
    scroll-behavior: smooth;
    overflow-y: ${(p: any) => p.$legnth < 6 ? "auto" : 'scroll'};
    margin-bottom: 10px
`
