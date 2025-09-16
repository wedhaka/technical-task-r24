import { useEffect, useLayoutEffect, useRef } from "react";
import styled from "styled-components";

interface PlateCanvasProps {
    plateList: [];
}

export const PlateCanvasPattern = ({plateList}: PlateCanvasProps) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        Promise.all(
            plateList.map((plate) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = plate.img;
                    img.style.border = '2px solid red'
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                })
            )
        ).then((images) => {
            drawAll(images);
        })

        function drawAll(images) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let x = 0;
            let y = 0;
            let maxRowHeight = 0;

            images.forEach((img, i) => {
                const plate = plateList[i]; // get width & height from your data

                // wrap to next line if image exceeds canvas width
                if (x + plate.width > canvas.width) {
                    x = 0;
                    y += maxRowHeight;
                    maxRowHeight = 0;
                }

                const scaleX = plate.width / img.width;
                const scaleY = plate.height / img.height;
                const scale = Math.max(scaleX, scaleY); // cover (crop if needed)

                // crop size in original image
                const newWidth = plate.width / scale;
                const newHeight = plate.height / scale;

                // center crop
                const sx = (img.width - newWidth) / 2;
                const sy = (img.height - newHeight) / 2;

                // ctx.drawImage(img, x, y, plate.width, plate.height);

                ctx.drawImage(
                    img,
                    sx, sy, newWidth, newHeight, // crop from source
                    x, y, plate.width, plate.height  // draw into box
                );

                x += plate.width;
                if (plate.height > maxRowHeight) maxRowHeight = plate.height;
            });
        }
    }, [plateList]);

    return (
        <>
            <PlateCanvasBox ref={canvasRef} width={800} height={400}/>
        </>
    )
}

const PlateCanvasBox = styled.canvas`
    max-width: 100%;
    max-height: 100%;
    border: 1px solid red;
    width: calc(100% - 2px);
    height: 100%;
`