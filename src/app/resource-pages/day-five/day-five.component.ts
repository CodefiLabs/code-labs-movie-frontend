import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-five',
  templateUrl: './day-five.component.html',
  styleUrls: ['./day-five.component.scss']
})
export class DayFiveComponent implements OnInit {
  localStorageCode = `
import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor( @Inject(PLATFORM_ID) protected platformId: Object) { }

  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value || null))
    }
  }

  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
      } else {
        return null
      }
    }
  }

  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key)
    }
  }
}

`
  constructor() { }

  ngOnInit(): void {
  }

}
