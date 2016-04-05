import {Component} from 'angular2/core';

@Component({
  selector: 'admin',
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
  `],
  template: require('./admin.html')
})
export class Admin {
  constructor() {

  }
}