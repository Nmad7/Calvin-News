import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public search: string;
  private data: Array<Object>;
  public scrollData: Array<Object>;
  public sortBy: string;
  public initialized: boolean;
  constructor(private rest: NewsService) {
    this.scrollData = [];
    this.data = [];
    this.sortBy = "relevance";
    this.initialized = true;
  }

  addExtraNews(): void{
    this.scrollData.push(...this.data.splice(0, 10));
  }

  ngOnInit(): void {
  }

  getSearch(text:string): void {
    this.initialized = false;
    this.rest.getSearch(text, this.sortBy).toPromise().then((resp: any) => {
    this.scrollData = [];
    this.data = resp;
    this.addExtraNews();
    this.initialized = true;
    })
  }

  onSearch(): void{
    this.getSearch(this.search)
  }

  onScroll(): void{
    this.addExtraNews()
  }

}

