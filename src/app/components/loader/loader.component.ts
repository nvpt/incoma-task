import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from '../../services/loader.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    constructor(public loaderService: LoaderService) {}
    //
    // ngOnInit(): void {
    //     this.$LoaderSub = this.loaderService.$showLoad.subscribe((state) => {
    //         console.log('state ', state);
    //
    //         // this.show = state;
    //     });
    // }
    //
    // ngOnDestroy(): void {
    //     this.$LoaderSub && this.$LoaderSub.unsubscribe();
    // }
}
