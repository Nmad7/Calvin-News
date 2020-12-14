import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PreferencesComponent } from './preferences/preferences.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: {title: 'About'}},
  { path: 'search', component: SearchComponent, data: {title: 'Search'} },
  { path: 'latest-news', component: LatestNewsComponent, data: {title: 'Latest News'} },
  { path: 'preferences', component: PreferencesComponent, data: {title: 'Preferences'} },
  {path: '**', redirectTo: 'latest-news', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LatestNewsComponent,
    SearchComponent,
    AboutComponent,
    HeaderComponent,
    PreferencesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    InfiniteScrollModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    OverlayModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
