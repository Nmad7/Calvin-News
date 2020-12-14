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
  initialized: Boolean;
  favorites: Array<string>;
  isOpen: boolean;
  radioSelection: string;
  radioButtons: Array<string>;
  constructor(private rest: NewsService) {
    this.initialized = false;
    this.scrollData = []
    this.data = []
    this.isOpen = false;
    this.favorites = JSON.parse(localStorage.getItem("favorites"));
    this.radioSelection = 'All';
    this.radioButtons = ['All','Favorites']
    if (!this.favorites) this.favorites = [];
  //   this.data = [
  //     {
  //       title: "Apply for Orientation Board",
  //       date: "Nov. 30, 2020, 10:16 EST",
  //       author: "By Joshua Bulten",
  //       content: "Are you looking for a great summer paid internship that will challenge and grow you? Apply to be a part of the Orientation Board. If you are curious and have questions, we have an info meeting on December 1. Check out our website for more information: https://calvin.edu/offices-services/orientation/leadership-opportunities/orientation-interns/"
  //     },
  //     {
  //       title: "Virtual Movie Night with the Sustainability Coordinators!",
  //       date: "Nov. 30, 2020, 9:16 EST",
  //       author: "By Bethany Williams",
  //       content: 'Next Thursday, the SCs will be hosting a showing of the documentary Food, Inc. on MS Teams! Join us as we examine the ways in which our food system impacts the environment :) The Deets: - - Thursday, December 3 - - 6:30 - 8:00p.m. EST - - optional discussion afterwards How to watch: If you sign up via this form (https://urldefense.proofpoint.com/v2/url?u=https-3A__docs.google.com_forms_d_e_1FAIpQLSd9dTAsM55V5iGW-2DPOa2rEZWA-2D8W9RwxwTdS79nyZp1T90eQw_viewform-3Fusp-3Dsf-5Flink&d=DwIB-g&c=4rZ6NPIETe-LE5i2KBR4rw&r=kCPJsCp_HEjNpump8eHmu7pxhGVzoVk9lR8wY9P3VsE&m=H1kzsusWY2tX7sClbcDnWCM4LgxYZ9u9HWUBfn_fOho&s=ppfVhXcj0jvVZzqiIY5hhG0b-2RSKYJYFniimSWoBvs&e= ) we will send you an invite to the MS Teams meeting. You should be able to forward the email invite to anyone, so if your friends decide to come last-minute, they should be able to join, too!',
  //     }
  //   ]
  }

  addExtraNews(): void{
    this.initialized ? this.scrollData.push(...this.data.splice(0, 10)) : null;
    console.log(this.scrollData)
    console.log(this.initialized)
  }

  ngOnInit(): void {
    this.getNews();
    console.log(this.favorites)
  }

  getNews(): void {
     this.rest.getNews().toPromise().then((resp: any) => {
      this.data = resp;
      console.log(this.data);
      this.initialized = true;
      this.addExtraNews();
    })
  }

  onScroll(): void{
    console.log("here")
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
      this.initialized = false;
      this.scrollData = [];
      this.rest.getNews().toPromise().then((resp: any) => {
        this.data = resp;
        const temp :Array<News> = this.data.filter((obj)=> this.favorites.includes(obj.uuid))
        console.log("favorites")
        console.log(temp)
        this.data=temp;
        this.initialized = true;
        this.addExtraNews();
      })
    }
    if (event.value==='All'){
      console.log("all")
      this.initialized = false;
      this.scrollData = [];
      this.getNews();
    }
}
}
