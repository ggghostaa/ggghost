
// @ts-ignore
import CryptoJS from 'crypto-js/crypto-js'
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
        return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    }

    /**
     * aes算法解密
     * @param data
     * @private
     */
    private decrypt(data: string) {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    private synthesisKey(key: string) {
        return PREFIX + key;
    }




    set(key: string, value: any, expires?: boolean | number) {
        // console.log('ket:' + key)
        // console.log('value', value);
        // console.log('expires', expires)
        const storedItem : IStoredItem = {
            value: value,
            expires: false
        };
        if (expires) {//设置超时时间
            storedItem.expires = new Date().getTime() + (expires === true ? 72 * 60 * 60 * 1000 : expires);
        }
        const data = JSON.stringify(storedItem);
        console.log(data.toString())
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
                // console.log('超时')
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