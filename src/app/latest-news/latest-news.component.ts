import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { NewsService, News } from '../news.service';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {
  data: Array<News>;
  scrollData: Array<News>;
  initialized: boolean;
  favorites: Array<string>;
  radioSelection: string;
  radioButtons: Array<string>;
  constructor(private rest: NewsService) {
    //intialize variables
    this.initialized = false;
    this.scrollData = []
    this.data = []
    //get favorites from local storage
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!this.favorites) this.favorites = [];
    //Set initital radio button
    this.radioSelection = 'All';
    //Set radio button names
    this.radioButtons = ['All','Favorites']
  }

  addExtraNews(): void{
    //add 10 more news items when data has been initialized
    this.initialized ? this.scrollData.push(...this.data.splice(0, 10)) : null;
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    //get news from newsService and initialize when complete
     this.rest.getNews().toPromise().then((resp: any) => {
      this.data = resp;
      this.initialized = true;
      this.addExtraNews();
    })
  }

  onScroll(): void{
    this.addExtraNews()
  }

  onFavorite(uuid:string): void{
    if (this.favorites.includes(uuid)){
      //item was already put in favorites
      //remove from favorites
      this.favorites.splice(this.favorites.indexOf(uuid),1);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    } else {
      //item needs to be added to favorites
      this.favorites.push(uuid)
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

  onChange(event:MatRadioChange) {
    if (event.value==='Favorites'){
      //if radio button is 'favorites'
      this.initialized = false;
      this.scrollData = [];
      //get news items from newsService and filter out non favorites
      this.rest.getNews().toPromise().then((resp: any) => {
        this.data = resp;
        const temp :Array<News> = this.data.filter((obj)=> this.favorites.includes(obj.uuid))
        this.data=temp;
        this.initialized = true;
        this.addExtraNews();
      })
    }
    if (event.value==='All'){
      //if radio button is 'all'
      this.initialized = false;
      this.scrollData = [];
      this.getNews();
    }
}
}
