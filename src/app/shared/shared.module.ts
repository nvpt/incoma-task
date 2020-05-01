import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

/*ANGULAR MATERIAL*/
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

/*COMPONENTS*/
import {TopRatePageComponent} from '../top-rate-page/top-rate-page.component';
import {ListItemComponent} from '../top-rate-page/components/list-item/list-item.component';
import {InlineSearchComponent} from '../components/inline-search/inline-search.component';
import {LoaderComponent} from '../components/loader/loader.component';

/*PIPES*/
import {FilterItemsPipe} from '../top-rate-page/pipes/filter-items.pipe';

/*DIRECTIVES*/
import {InfiniteScrollDirective} from '../directives/infinite-scroll.directive';

@NgModule({
    declarations: [
        TopRatePageComponent,
        ListItemComponent,
        InlineSearchComponent,
        LoaderComponent,
        FilterItemsPipe,
        InfiniteScrollDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatButtonModule,
        YouTubePlayerModule,
        BrowserAnimationsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatButtonModule,
        YouTubePlayerModule,
        BrowserAnimationsModule,
        TopRatePageComponent,
        ListItemComponent,
        InlineSearchComponent,
        LoaderComponent,
        FilterItemsPipe,
        InfiniteScrollDirective
    ]
})
export class SharedModule {}
