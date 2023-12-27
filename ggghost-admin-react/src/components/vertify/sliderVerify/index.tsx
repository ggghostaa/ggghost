/*
 * @Autor: ggghost
 * @Date: 2023/21/25 21:50:57
 * @Description: file content
 */

import React, { useEffect, useRef, useState } from "react";
import {Dialog, DialogTitle, paperClasses} from "@mui/material";
import './index.css'

import {IVerifyProps, ValidResult} from "../IVerify";

const SliderVerify: React.FC<IVerifyProps> = (props: IVerifyProps) => {
    const { open, handClose } = props;

    const handle = () =>{
        const result = new ValidResult('aa', true);
        handClose(new ValidResult('aa', true))
    }

    return (
        <Dialog open={open} onClose={handle}>
            <div style={{height: '600px', width: '600px'}}>

                <DialogTitle>Set backup account</DialogTitle>
                SliderVerify
            </div>
        </Dialog>
    )
}

export default SliderVerify;