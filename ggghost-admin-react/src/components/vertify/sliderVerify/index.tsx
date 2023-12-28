/*
 * @Autor: ggghost
 * @Date: 2023/21/25 21:50:57
 * @Description: file content
 */

import React, { useEffect, useRef, useState } from "react";
import {Dialog, DialogTitle, paperClasses} from "@mui/material";
import './index.css'

import {IVerifyProps, IValidResult, ImageCaptchaTrack} from "../IVerify";
import {valid} from "semver";

const SliderVerify: React.FC<IVerifyProps> = (props: IVerifyProps) => {
    const { open, handClose } = props;

    const sliderTranslate = useRef('translate(0px, 0px)');
    const btnTranslate = useRef('translate(0px, 0px)');
    const bgTranslate = useRef('translate(0px, 0px)');
    const originYRef = useRef(0);
    const originXRef = useRef(0);
    const [count, setCount] = useState(0);
    const isMouseDown =useRef(false);
    const [currentCaptchaId, setCurrentCaptchaId] = useState('');
    const [sliderImage, setSliderImage] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [translate, setTranslate] = useState('translate(0px, 0px)');
    const startSlidingTime = useRef<Date | null>(null);
    const endSlidingTime =useRef<Date | null>( null);
    const [imageCaptchaTrack, setImageCaptchaTrack] = useState<ImageCaptchaTrack>(new ImageCaptchaTrack());


    const handle = () =>{
        handClose({id: 'aa', status: false})
    }

    const initCaptchaDate = () => {
        setImageCaptchaTrack(new ImageCaptchaTrack());

    }

    /** 开始滑动**/
    const handleDragStart = (ev: (TouchEvent | MouseEvent)) => {
        console.log("方法1")
        //获取拖拽起始坐标
        if (!isMouseDown.current) return;
        console.log("开始")
        const originX = ev instanceof MouseEvent ? ev.clientX : ev.touches[0].clientX;
        const originY = ev instanceof MouseEvent ? ev.clientY : ev.touches[0].clientY;
        startSlidingTime.current = new Date()
        originXRef.current = originX
        originYRef.current = originY
    }

    /**
     * 滑动过程
     * @param ev
     */
    const handleDragMove = (ev: (TouchEvent | MouseEvent)) => {

        if (! isMouseDown.current) return false;
        console.log('方法2')
        const w = 206;//滑道宽度
        // 获取拖拽移动的距离
        const eventX = ev instanceof MouseEvent ? ev.clientX : ev.touches[0].clientX;
        const eventY = ev instanceof MouseEvent ? ev.clientY : ev.touches[0].clientY;
        let moveX =  eventX - originXRef.current;
        let moveY = eventY - originYRef.current;

        //验证码超时
        if (imageCaptchaTrack.trackList.length > 2000) {
            //调用reset重装数据

            return;
        }
        if (moveX < 0) {
            moveX = 0;
        } else if (moveX > w) {
            moveX = w;
        } else {
            setTranslate('translate(' + moveX + 'px, 0px)')
            imageCaptchaTrack.addTrack(moveX, moveY, new Date().getTime() - (startSlidingTime.current?.getTime() as number));
        }
    }

    const onHandleDrag =  () => {
        isMouseDown.current = true
    }
    /**滑块移动事件**/
    const handleDragEnd = (ev: (TouchEvent | MouseEvent)) => {
        if (!isMouseDown.current) return;
        isMouseDown.current = false
        console.log('end')
        const eventX = ev instanceof MouseEvent ? ev.clientX : ev.changedTouches[0].clientX;
        if (eventX === originYRef.current) {
            //验证码错误直接返回
            return false;
        }
        endSlidingTime.current = new Date();
        sliderTranslate.current = 'translate(0px, 0px)'
        btnTranslate.current = 'translate(0px, 0px)'
        //后端验证
        valid();
        return true;
    }
    const valid = () => {

    }


    return (
        <Dialog open={open} onClose={handle}>
            <div className="slider">
                <div className="content">
                    <div className="bg-img-div" style={{transform: bgTranslate.current}}>
                        <img id="bg-img" src={backgroundImage}/>
                    </div>
                    <div className="slider-img-div" style={{transform: translate}}>
                        <img id="slider-img" src={sliderImage}/>
                    </div>
                </div>
                <div className="slider-move">
                    <div className="slider-move-track">
                        拖动滑块完成拼图
                    </div>
                    <div className="slider-move-btn" style={{transform: translate}} onMouseDown={onHandleDrag}
                         onTouchStart={onHandleDrag}/>
                </div>
            </div>
        </Dialog>
    )
}

export default SliderVerify;