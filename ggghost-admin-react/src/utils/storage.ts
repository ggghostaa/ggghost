
// import CryptoJS from 'crypto-js'
// import CryptoJS from "crypto-js/x64-core";
import * as crypto from "crypto";
enum StorageType {
    l = "localStorage",
    s = "sessionStorage"
}
interface IGStorage {
    storage: Storage;
    set(key: string, value: any) : void;
    set(key: string, value: any, expires?: number | boolean) : void;
    get(key: string) : any;
    delete(key: string) : void;
    clear() : void;

}
interface IStoredItem {
    value: string;
    expires: number | boolean;  //超时时间毫秒
}

const SECRET_KEY = 'BR*WrVFv6F26&=ctpyYew*eG';
// const IS_DEV = process.env.NODE_ENV === 'development';
const IS_DEV = false;
const config = require('../../package.json');
const PREFIX = config.name + '_' + config.version + '-';
class GStorage implements IGStorage{
    storage: Storage;
    constructor(type: StorageType) {
        this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage;
    }

    /**
     * aes算法加密
     * @param data
     * @private
     */
    private encrypt(data: string) {
        // const md5 = crypto.createHash('md5');
        // return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
        return ''
    }

    /**
     * aes算法解密
     * @param data
     * @private
     */
    private decrypt(data: string) {
        // const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
        // return bytes.toString(CryptoJS.enc.Utf8);
        return '';
    }

    private synthesisKey(key: string) {
        return PREFIX + key;
    }




    set(key: string, value: any, expires?: boolean | number) {
        const storedItem : IStoredItem = {
            value: value,
            expires: false
        };
        if (expires) {//设置超时时间
            storedItem.expires = expires === true ? 72 * 60 * 60 * 1000 : expires;
        }
        storedItem.expires = new Date().getTime()
        const data = JSON.stringify(storedItem);
        this.storage.setItem(this.synthesisKey(key),
            IS_DEV ? data : this.encrypt(data)
        );
    }

    get(key: string) {
        const data= this.storage.getItem(this.synthesisKey(key));
        if (data) {
            const storedItem: IStoredItem = IS_DEV ? JSON.parse(data) : JSON.parse(this.decrypt(data));
            const now = new Date().getTime();
            if (storedItem.expires && storedItem.expires < now) {//超时
                return null;
            }
            return storedItem.value;
        }
        return null;
    }
    delete(key: string) {
        this.storage.removeItem(this.synthesisKey(key));
    }
    clear() {
        this.storage.clear();
    }

}

const LStorage = new GStorage(StorageType.l);
const SStorage = new GStorage(StorageType.s);

export { LStorage, SStorage };