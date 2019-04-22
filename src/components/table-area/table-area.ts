import { Component } from '@angular/core';

/**
 * Generated class for the TableAreaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'table-area',
  templateUrl: 'table-area.html'
})
export class TableAreaComponent {

  text: string;

  constructor() {
    console.log('Hello TableAreaComponent Component');
    this.text = 'Hello World';
  }

}
