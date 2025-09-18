import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface PlateCanvasProps {
    plateList: any;
}

export const PlateCanvasPattern = ({plateList}: PlateCanvasProps) => {

    const canvasRef = useRef(null);
    const [windowWidth, setWindowWidth] = useState(800);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        drawLoading(ctx, canvas);

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

        function drawLoading(ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "gray";
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);
        }

        function drawAll(images: any) {
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

                ctx.save();

                // Move the origin to where the image should end up after flip
                ctx.translate(x + plate.width, y);
                ctx.scale(-1, 1); // flip horizontally

                ctx.drawImage(
                    img,
                    sx, sy, newWidth, newHeight,
                    0, 0, plate.width, plate.height
                );

                ctx.restore();


                x += plate.width;
                if (plate.height > maxRowHeight) maxRowHeight = plate.height;
            });
        }

    }, [plateList]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 320);
        };

        window.addEventListener("resize", handleResize);

        // cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return (
        <>
            <PlateCanvasBox ref={canvasRef} width={windowWidth} height={(windowWidth/16)*9}/>
        </>
    )
}

const PlateCanvasBox = styled.canvas`
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: auto;
`