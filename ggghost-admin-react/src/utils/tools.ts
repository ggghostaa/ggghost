/*
 * @Autor: ggghost
 * @Date: 2023/21/25 21:40:18
 * @Description: file content
 */


/**
 * 获取一个随机整数
 * @param start
 * @param end
 */
const getRandomNumberByRange = (start: number, end: number)=> {
    return Math.round(Math.random() * (end - start) + start);
}


export { getRandomNumberByRange }