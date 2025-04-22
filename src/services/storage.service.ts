import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
    private readonly document = inject(DOCUMENT);
    private readonly localStorage = this.document.defaultView?.localStorage;

    public saveData(key: string, value: string) {
        this.localStorage?.setItem(key, value);
    }

    public getData(key: string) {
        return this.localStorage?.getItem(key);
    }

    public removeData(key: string) {
        this.localStorage?.removeItem(key);
    }

    public clearData() {
        this.localStorage?.clear();
    }
}