import {GlobalMessage} from "./GlobalMessage";
import React from "react";
import ReactDOM from "react-dom/client";

interface IMessage {
    dom: Element | null;
    success(content: string, duration: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    error(content: string, duration: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    info(content: string, duration: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
    warning(content: string, duration: number, vertical?: 'top' | 'bottom', horizontal? : 'left' | 'center' | 'right') : void;
}
export const message: IMessage = {
    dom: null,
    success(content, duration, vertical, horizontal) {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const TSXdom = (<GlobalMessage content={content} duration={duration}
        type='success' vertical={vertical} horizontal={horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(TSXdom);
        document.body.appendChild(this.dom);
    },
    error(content: string, duration: number, vertical?: string, horizontal?: string): void {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const TSXdom = (<GlobalMessage content={content} duration={duration}
                                       type='error' vertical={vertical} horizontal={horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(TSXdom);
        document.body.appendChild(this.dom);
    },

    info(content: string, duration: number, vertical?: string, horizontal?: string): void {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const TSXdom = (<GlobalMessage content={content} duration={duration}
                                       type='info' vertical={vertical} horizontal={horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(TSXdom);
        document.body.appendChild(this.dom);
    },

    warning(content: string, duration: number, vertical?: string, horizontal?: string): void {
        if (vertical === undefined) vertical = 'top';
        if (horizontal === undefined) horizontal = 'center'
        this.dom = document.createElement('div');

        const TSXdom = (<GlobalMessage content={content} duration={duration}
                                       type='warning' vertical={vertical} horizontal={horizontal}>
        </GlobalMessage>)
        ReactDOM.createRoot(this.dom).render(TSXdom);
        document.body.appendChild(this.dom);
    }


}