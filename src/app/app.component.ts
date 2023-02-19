import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isAuthenticated!: boolean;

  public onAuthentication(value: boolean) {
    this.isAuthenticated = value;
  }










} 
