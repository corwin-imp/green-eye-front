import { CookieStorageService } from '../services/storage/cookie-storage';
import { Storage } from '../services/storage/storage.interface';
import { EnumerableAbstract } from './enumerable.abstract';

class OrderEnum extends EnumerableAbstract {
    private storage: Storage;
    public listData = (): { [key: string]: any } => ({});
    constructor(storage: Storage) {
        super();
        this.storage = storage;
    }

    removeAll() {
        return Promise.resolve();
    }
    setEnum(obj: any) {
        Object.keys(obj).forEach((key: string) => {
            this.storage.setItem(`order_${key}`, JSON.stringify(obj[key]));
        });
    }
    getEnum(key: string) {
        const data = this.storage.getItem(`order_${key}`);

        return data ? JSON.parse(data) : [];
    }
}

const OrderEnumService = new OrderEnum(CookieStorageService);

export default OrderEnumService;
