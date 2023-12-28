
/*
 * @Autor: ggghost
 * @Date: 2023/21/25 21:54:43
 * @Description: file content
 */

/**
 * 行为验证二维码组件props
 */
interface IVerifyProps {
    /** 组件开关 */
    open: boolean;
    /** 回调函数 */
    handClose(result: IValidResult): void;
}

/**
 * 验证码轨迹
 */
interface IImageCaptchaTrack {
    /** 验证码类型 */
    type?: string;
    /** 背景图宽带 */
    bgImageWidth?: number;
    /** 背景图高度 */
    bgImageHeight?: number;
    /** 块图宽度 */
    blockImageWidth?: number;
    /**块图高度 */
    blockImageHeight?: number;
    /** 开始时间 */
    startTime?: Date;
    /** 结束时间 */
    endTime?: Date;
    /** 行动轨迹 */
    trackList?: Track[];
    /** 添加行为轨迹 */
    addTrack(x: number, y: number, t: number, type?: string): void;

}

/**
 * 验证结果
 */
interface IValidResult {
    /** 验证结果 true ｜ false */
    status: boolean,
    /** 验证id */
    id: string,
}

/**
 * 行为轨迹
 */
type Track = {
    /** x轴 */
    x: number,
    /** y轴 */
    y: number
    /** 时间 */
    t: number,
    /** 移动类型 */
    type?: string
}

class ImageCaptchaTrack implements IImageCaptchaTrack{

    type?: string | undefined;
    bgImageWidth?: number | undefined;
    bgImageHeight?: number | undefined;
    blockImageWidth?: number | undefined;
    blockImageHeight?: number | undefined;
    startTime?: Date | undefined;
    endTime?: Date | undefined;
    trackList: Track[];

    constructor() {
        this.trackList = [];
    }
    addTrack(x: number, y: number, t: number, type?: string | undefined): void {
        if (this.trackList) {
            this.trackList = [];
        }
        const trackItem = {x: x, y: y, t: t, type: type
        }
        this.trackList.push(trackItem);
    }


}




export {ImageCaptchaTrack};
export type {IVerifyProps, IValidResult, IImageCaptchaTrack}

