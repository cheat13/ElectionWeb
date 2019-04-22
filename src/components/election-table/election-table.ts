import { Component } from '@angular/core';

/**
 * Generated class for the ElectionTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'election-table',
  templateUrl: 'election-table.html'
})
export class ElectionTableComponent {

  public table: number;
  public filter: number;

  constructor() {
    console.log('Hello ElectionTableComponent Component');
    this.table = 1;
    this.filter = 1;
  }

}
