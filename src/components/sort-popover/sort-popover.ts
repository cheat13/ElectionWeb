import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SortPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sort-popover',
  templateUrl: 'sort-popover.html'
})
export class SortPopoverComponent {

  text: string;
  isCompare: boolean;

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    console.log('Hello SortPopoverComponent Component');
    this.text = 'Hello World';
    this.isCompare = navParams.get('isCompare');
  }

  select(sort: number) {
    this.viewCtrl.dismiss(sort);
  }

}
