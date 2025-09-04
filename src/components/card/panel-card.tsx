import { useState } from "react";
import { PlateTile } from "../plate/plate-tile";
import { Button } from "../button/button";


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
        if(index === 0) return;
        setPlateList(prev => prev.filter((_, i) => i !== index));
    }

    const handleUpdatePlateFromList = (index: number) => {
        setPlateList(prev => prev.filter((_, i) => i !== index));
    }

    console.log(plateList, 'plateList 1');

    const PlateTileList = () => {
        return (
            plateList.map((plate, index) => 
                <PlateTile 
                    plateDetails={plate} 
                    number={index} 
                    handPlateRemove={() => handleRemovePlateFromList(index)} 
                    handPlateUpdate={() => handleUpdatePlateFromList(index)} 
                    key={index}
                    />
            )
        )
    }
    
    return (
        <>
            { PlateTileList() }
            <Button align={'right'} handleAddEvent={handleAddNewPlateToList} display={plateList.length === 10} />
        </>
    );
}


