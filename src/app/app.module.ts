import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './albums/album-detail/album-detail.component';
import { AlbumEditComponent } from './albums/album-edit/album-edit.component';
import { AlbumItemComponent } from './albums/album-item/album-item.component';
import { AlbumListComponent } from './albums/album-list/album-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumsComponent,
    AlbumDetailComponent,
    AlbumEditComponent,
    AlbumItemComponent,
    AlbumListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
