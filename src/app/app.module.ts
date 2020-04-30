import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {YouTubePlayerModule} from '@angular/youtube-player';

import {AppComponent} from './app.component';
import {TopRatePageComponent} from './top-rate-page/top-rate-page.component';
import {ListItemComponent} from './top-rate-page/components/list-item/list-item.component';
import {InlineSearchComponent} from './components/inline-search/inline-search.component';
import {LoaderComponent} from './components/loader/loader.component';
import {FilterItemsPipe} from './top-rate-page/pipes/filter-items.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {InfiniteScrollDirective} from './directives/infinite-scroll.directive';

@NgModule({
    declarations: [
        AppComponent,
        TopRatePageComponent,
        ListItemComponent,
        InlineSearchComponent,
        LoaderComponent,
        FilterItemsPipe,
        InfiniteScrollDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        YouTubePlayerModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
