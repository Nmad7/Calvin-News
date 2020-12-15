import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

export interface News {
  uuid: string;
  title: string;
  story: string;
  author: string;
  date: Date;
  groupname: string;
  categories: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private endpoint:string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error code: ${error.status}, ` +
        `Body is: ${error.error}`);
    }
    return throwError(
      'Something broke');
  }

  getNews(): Observable<any> {
    return this.http.get<News[]>(this.endpoint+'news.v1').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getSearch(text:string,sortBy:string): Observable<any> {
    if (sortBy==='date'){
      return this.http.get<News[]>(this.endpoint+'search/?q='+encodeURIComponent(text)+'&t=date').pipe(
        retry(2),
        catchError(this.handleError)
      );
    } else {
      return this.http.get<News[]>(this.endpoint+'search/?q='+encodeURIComponent(text)).pipe(
        retry(2),
        catchError(this.handleError)
      );
    }
  }
}
