import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public search: string;
  private data: Array<News>;
  public scrollData: Array<News>;
  public sortBy: string;
  public initialized: boolean;
  constructor(private rest: NewsService) {
    //initialize variables
    this.scrollData = [];
    this.data = [];
    this.sortBy = "relevance";
    this.initialized = true;
  }

  addExtraNews(): void{
    //Add 10 more news items to scroll window
    this.scrollData.push(...this.data.splice(0, 10));
  }

  ngOnInit(): void {
  }

  //getSearch gets search results from newsService
  getSearch(text:string): void {
    //start progress circle
    this.initialized = false;
    this.rest.getSearch(text, this.sortBy).toPromise().then((resp: any) => {
    this.scrollData = [];
    this.data = resp;
    this.addExtraNews();
    //stop progress circle
    this.initialized = true;
    })
  }

  onSearch(): void{
    this.getSearch(this.search)
  }

  //when infinite scroll goes down far enough get extra news
  onScroll(): void{
    this.addExtraNews()
  }

}

