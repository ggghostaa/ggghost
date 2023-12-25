/*
 * @Autor: ggghost
 * @Date: 2023/12/25 12:46:46
 * @Description: ts暴露全局消息组件
 */

import {GlobalMessage} from "./GlobalMessage";
import React from "react";
import ReactDOM from "react-dom/client";

interface IMessage {
    dom: Element | null;
    success(content: string, duration?: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    error(content: string, duration?: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    info(content: string, duration?: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    warning(content: string, duration?: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
}

const defaultConfig = {
    duration: 6000,
    vertical: 'top',
    horizontal: 'center'
}
export const message: IMessage = {
    dom: null,
    success(content, duration?: number, vertical?: string, horizontal?: string) {
        this.dom = document.createElement('div');
        const JSXDom = (<GlobalMessage content={content} duration={duration ? duration : defaultConfig.duration}
        type='success' vertical={vertical ? vertical : defaultConfig.vertical} horizontal={horizontal ? horizontal : defaultConfig.horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(JSXDom);
        document.body.appendChild(this.dom);
    },
    error(content: string, duration?: number, vertical?: string, horizontal?: string): void {
        this.dom = document.createElement('div');
        const JSXDom = (<GlobalMessage content={content} duration={duration ? duration : defaultConfig.duration}
                                       type='error' vertical={vertical ? vertical : defaultConfig.vertical} horizontal={horizontal ? horizontal : defaultConfig.horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(JSXDom);
        document.body.appendChild(this.dom);
    },

    info(content: string, duration?: number, vertical?: string, horizontal?: string): void {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const JSXDom = (<GlobalMessage content={content} duration={duration ? duration : defaultConfig.duration}
                                       type='info' vertical={vertical ? vertical : defaultConfig.vertical} horizontal={horizontal ? horizontal : defaultConfig.horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(JSXDom);
        document.body.appendChild(this.dom);
    },

    warning(content: string, duration?: number, vertical?: string, horizontal?: string): void {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const JSXDom = (<GlobalMessage content={content} duration={duration ? duration : defaultConfig.duration}
                                       type='warning' vertical={vertical ? vertical : defaultConfig.vertical} horizontal={horizontal ? horizontal : defaultConfig.horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(JSXDom);
        document.body.appendChild(this.dom);
    }


}