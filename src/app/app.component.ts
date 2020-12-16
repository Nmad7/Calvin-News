import { Component, OnInit } from '@angular/core';
import {ColorService} from '../app/color.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'CalvinNews';
  isDark: boolean = false;

  constructor(private colorService: ColorService){
  }

  ngOnInit() {
    this.colorService.getMode().subscribe( (darkMode) => this.isDark = darkMode)
  }

  switchMode(isDarkMode: boolean):void{
    this.isDark = isDarkMode;
  }
}
