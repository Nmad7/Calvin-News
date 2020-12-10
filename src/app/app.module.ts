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

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: {title: 'About'}},
  { path: 'search', component: SearchComponent, data: {title: 'Search'} },
  { path: 'latest-news', component: LatestNewsComponent, data: {title: 'Latest News'} },
  {path: '**', redirectTo: 'latest-news', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LatestNewsComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
