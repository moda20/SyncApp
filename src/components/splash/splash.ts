import {Component, Input} from '@angular/core';

/**
 * Generated class for the SplashComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'splash',
  templateUrl: 'splash.html'
})
export class SplashComponent {
  @Input() splash: any;
  text: string;

  //secondPage = SecondPagePage;
  constructor() {
    console.log('Hello SplashComponent Component');
    this.text = 'Hello World';
  }



}
