import React, { useEffect, useRef, useState } from 'react'
import { Context } from 'vm';
import { CirclePicker } from 'react-color';
import EraserIcon from '../Icons/EraserIcon'




function DrawPanel(this: any) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<Context | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState("#000");
    const [penSize, setPenSize] = useState(5);
    const circleColors = ["#000000", "#f44336", "#E91E63", "#9C27B0", "#2196F3", "#00BCD4",
        "#4CAF50", "#CDDC39", "#FFEB3B", "#FF9800", "#795548", "#9E9E9E"]




    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.width = `${window.innerWidth / 2}px`;
            canvas.style.height = `${window.innerHeight / 2}px`;
            const context = canvas.getContext("2d");
            if (context) {
                context.scale(2, 2);
                context.lineCap = "round"; //Round ending 
                context.strokeStyle = "#000";
                context.lineWidth = 5;
                contextRef.current = context
            }
        }
    }, [])

    const startDrawing: any = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent;
        if (contextRef.current) {
            contextRef.current.beginPath()
            contextRef.current.moveTo(offsetX, offsetY)
            setIsDrawing(true);
        }
    }

    const stopDrawing: any = () => {
        if (contextRef.current) {
            contextRef.current.closePath()
        }
        setIsDrawing(false);
    }

    const draw: any = ({ nativeEvent }: any) => {
        if (isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            if (contextRef.current) {
                contextRef.current.lineTo(offsetX, offsetY);
                contextRef.current.stroke()
            }
        }
    }

    const handleColorChange: any = (color: any) => {
        setPenColor(color.hex)
        if (contextRef.current) {
            contextRef.current.strokeStyle = color.hex
        }
    }

    const erase: any = () => {
        setPenColor("#fff")
        if (contextRef.current) {
            contextRef.current.strokeStyle = "#fff"
        }
    }

    const changePenSize: any = (value: any) => {
        setPenSize(value.eventPhase)
    }


    return (
        <div>
            <div className="tw-flex tw-justify-center">
                <canvas className="tw-border-2 tw-bg-red-300" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} ref={canvasRef} />
            </div>
            <div className="tw-flex tw-justify-center tw-mt-5 tw-items-center">
                <div className="tw-mr-2">
                    <CirclePicker color={penColor} onChangeComplete={handleColorChange} colors={circleColors} />
                </div>
                <div className="tw-ml-2 tw-cursor-pointer tw-flex tw-justify-center tw-mt-5 tw-items-center" onClick={erase}>
                    <EraserIcon></EraserIcon>
                </div>
            </div>
        </div>
    );
}

export default DrawPanel;