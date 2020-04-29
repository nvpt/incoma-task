import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ContentListComponent} from './content-list/content-list.component';
import {ListItemComponent} from './content-list/components/list-item/list-item.component';

@NgModule({
    declarations: [AppComponent, ContentListComponent, ListItemComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
