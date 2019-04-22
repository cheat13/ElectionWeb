import { Component } from '@angular/core';

/**
 * Generated class for the TablePartyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'table-party',
  templateUrl: 'table-party.html'
})
export class TablePartyComponent {

  text: string;

  constructor() {
    console.log('Hello TablePartyComponent Component');
    this.text = 'Hello World';
  }

}
