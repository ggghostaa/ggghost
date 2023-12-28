import React, {useEffect, useRef, useState} from "react";
import {imgSrcA} from "./imgSrcA";
import {imgSrcB} from "./imgSrcB";
import Button from "@mui/material/Button";
const Canv = () => {
    const canvRef = useRef<any>(null);
    const blkRef = useRef<any>(null);
    const isDownRef = useRef<boolean>(false);
    useEffect(()=>{
        canvRef.current.addEventListener('mousedown', downD);
        canvRef.current.addEventListener('mousemove', moveM);//鼠标移动
        canvRef.current.addEventListener('mouseup', upM)
    })
    const downD = (e: any) => {
        console.log('=======dowm')
        isDownRef.current = true
    }
    const upM = (e: any) => {
        console.log('===up')
        isDownRef.current = false
    }
    const moveM = (e: any) => {
        if ((isDownRef.current)) {
            console.log('isDown', isDownRef.current)
            console.log('======move====')
        }

    }
    const test = ()=>{
        let img = new Image();
        // img.src = 'https://img.win3000.com/m00/98/46/1c0a8d4896ca60a3b268268300c5ef43.jpg';
        img.src = imgSrcA
        img.onload = () => {
            const canvasCtx = canvRef.current.getContext('2d');
            canvasCtx.drawImage(img, 0, 0, canvRef.current.width, canvRef.current.height)
            // canvasCtx.drawImage(img, 0, 0)
            // canvasCtx.fillStyle(pat)
        }

        const blkCtx = canvRef.current.getContext('2d');
        let imgb = new Image();
        imgb.src = imgSrcB;
        imgb.onload = () => {
            blkCtx.drawImage(imgb, 10, 10, 200, 100)
        }

    }
    return (
        <React.Fragment>
            <div >
                <Button onClick={() => {
                    console.log(canvRef)
                }}>输出参数</Button>
                <Button onClick={test}>开画</Button>
                <Button onClick={()=>{console.log(isDownRef.current)}}>isDown</Button>
            </div>
            <div style={{width: '100%', height: '100%'}}>
                <canvas ref={canvRef} style={{width: '500px', height:'600px'}}>
                </canvas>
            </div>
            <div onClick={()=>{
            }}>开始移动</div>


        </React.Fragment>
    )
}
export default Canv;