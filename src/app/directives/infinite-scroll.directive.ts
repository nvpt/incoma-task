import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
    @Output() onScroll?: EventEmitter<any> = new EventEmitter<any>();
    @Input() cancelScroll?: boolean = false;

    @HostListener('scroll', ['$event']) onScrollHandler(event: any): void {
        if (event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight) {
            !this.cancelScroll && this.onScroll.emit();
        }
    }
}
