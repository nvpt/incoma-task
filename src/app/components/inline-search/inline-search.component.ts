import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-inline-search',
    templateUrl: './inline-search.component.html',
    styleUrls: ['./inline-search.component.scss']
})
export class InlineSearchComponent {
    @ViewChild('inputField') inputField: ElementRef;
    @Input() search: string;
    @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

    clear(): void {
        this.searchChange.emit('');
    }

    focus(): void {
        this.inputField.nativeElement.focus();
    }
}
