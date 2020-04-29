import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ContentListComponent} from './content-list/content-list.component';
import {ListItemComponent} from './content-list/components/list-item/list-item.component';
import {InlineSearchComponent} from './components/inline-search/inline-search.component';

@NgModule({
    declarations: [AppComponent, ContentListComponent, ListItemComponent, InlineSearchComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
