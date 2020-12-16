import { Component, OnInit} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {ColorService} from '../color.service'

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  isDark:boolean;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    this.colorService.getMode().subscribe( (darkMode) => this.isDark = darkMode)
  }

  clearFavorites(){
    localStorage.setItem("favorites", JSON.stringify([]));
  }

  onDarkModeSwitched({checked}: MatSlideToggleChange) :void {
    this.colorService.setMode(checked);
  }

}
