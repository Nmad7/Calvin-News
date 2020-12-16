import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs';

/*
ColorService connects app.component with the dark mode toggle in preferences.component.
Due to dark mode having to take effect in app.component, this service provides a mechanism
to pass changes in preferences to app. (This could be done through chaining event emitters through
  header to app on change but this is apparently bad practice)
*/

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  darkMode: boolean;
  //BehaviorSubject service implimentation idea from https://stackoverflow.com/questions/57636203/subscribe-to-observable-vs-subscribe-to-subject
  darkModeBehav: BehaviorSubject<boolean>

  constructor() {
    const dark:string = localStorage.getItem("darkmode");
    //check if no item in local storage (both "" and null are falsy)
    if(!dark){
      this.darkMode = false;
    }
    else{
      this.darkMode = (dark === "true")
    }
    this.darkModeBehav = new BehaviorSubject<boolean>(this.darkMode);
  }

  getMode(){
    return this.darkModeBehav.asObservable();
  }

  setMode(mode: boolean){
    this.darkMode = mode;
    this.darkModeBehav.next(this.darkMode);
    const stringMode: string = this.darkMode? "true":"false";
    localStorage.setItem("darkmode",stringMode);
  }
}
