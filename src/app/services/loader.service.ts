import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    // $showLoad: Subject<boolean> = new Subject<boolean>();
    showLoad: boolean = false;

    constructor() {}

    show() {
        // this.$showLoad.next(true);
        this.showLoad = true;
    }

    hide() {
        // this.$showLoad.next(false);
        this.showLoad = false;
    }
}
