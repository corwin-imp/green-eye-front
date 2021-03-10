import { CookieStorageService } from '../services/storage/cookie-storage';
import { Storage } from '../services/storage/storage.interface';
import { EnumerableAbstract } from './enumerable.abstract';

class GeneralEnum extends EnumerableAbstract {
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
            this.storage.setItem(`general_${key}`, JSON.stringify(obj[key]));
        });
    }
    getEnum(key: string) {
        const data = this.storage.getItem(`general_${key}`);

        return data ? JSON.parse(data) : [];
    }
}

const GeneralEnumService = new GeneralEnum(CookieStorageService);

export default GeneralEnumService;
