import styled from "styled-components"

export const SnapShotBtn = () => {
    
    const handleDonwloadImg = () => {
        const canvas = document.getElementsByTagName('canvas');
        const dataURL = canvas[0].toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "canvas-image.png";
        link.click();
    }
    
    return (
        <>
            <SnapShot onClick={() => handleDonwloadImg()}>Save as PNG</SnapShot>
        </>
    )
}


const SnapShot = styled.button`
    right: 150px;
    border: 1px solid #ccc;
    padding: 6px 12px;
    cursor: pointer;
    width: auto;
    height: auto;
    color: white;
    background-color: gray;
    border-radius: 5px;
    font-size: 14px;
    padding: 5px 10px;
    margin-left: 10px;
`