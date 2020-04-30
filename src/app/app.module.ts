import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {YouTubePlayerModule} from '@angular/youtube-player';

import {AppComponent} from './app.component';
import {ContentListComponent} from './content-list/content-list.component';
import {ListItemComponent} from './content-list/components/list-item/list-item.component';
import {InlineSearchComponent} from './components/inline-search/inline-search.component';
import {LoaderComponent} from './components/loader/loader.component';
import {FilterItemsPipe} from './content-list/pipes/filter-items.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent,
        ContentListComponent,
        ListItemComponent,
        InlineSearchComponent,
        LoaderComponent,
        FilterItemsPipe
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
