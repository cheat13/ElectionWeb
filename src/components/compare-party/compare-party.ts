import { Component } from '@angular/core';
import { CompareScore } from '../../app/models';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';
import { PopoverController, LoadingController } from 'ionic-angular';
import { SortPopoverComponent } from '../sort-popover/sort-popover';

/**
 * Generated class for the ComparePartyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'compare-party',
  templateUrl: 'compare-party.html'
})
export class ComparePartyComponent {

  public type: string;
  public batch1st: string;
  public batch2nd: string;
  public compareScore: CompareScore[] = [];
  public compareScoreParty: CompareScore[] = [];
  public compareScorePartyRatio: CompareScore[] = [];
  public total: CompareScore = new CompareScore();

  constructor(private cloudSync: CloudSyncProvider, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    console.log('Hello ComparePartyComponent Component');
    this.type = 'score';
    this.batch1st = "2";
    this.batch2nd = "3";
  }

  ngOnInit() {
    this.loadCompareScoreParty();
    this.loadCompareScorePartyRatio();
  }

  loadCompareScoreParty() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.cloudSync.loadCompareScoreParty(this.batch1st, this.batch2nd)
      .subscribe(data => {
        this.compareScoreParty = data;
        this.setData();
        loader.dismiss();
      });
  }

  loadCompareScorePartyRatio() {
    this.cloudSync.loadCompareScorePartyRatio(this.batch1st, this.batch2nd)
      .subscribe(data => {
        this.compareScorePartyRatio = data;
        this.setData();
      })
  }

  setData() {
    this.compareScore = (this.type == 'score') ? this.compareScoreParty : this.compareScorePartyRatio;
    this.calcTotal();
  }

  calcTotal() {
    if (this.compareScore.length > 0) {
      this.total.party = 'คะแนนรวม';
      this.total.scoreBatch1st = (this.compareScore == this.compareScorePartyRatio) ? 100 : this.compareScore.map(it => it.scoreBatch1st).reduce((a, b) => a + b);
      this.total.scoreBatch2nd = (this.compareScore == this.compareScorePartyRatio) ? 100 : this.compareScore.map(it => it.scoreBatch2nd).reduce((a, b) => a + b);
      this.total.diff = (this.compareScore == this.compareScorePartyRatio) ? 0 : this.total.scoreBatch2nd - this.total.scoreBatch1st;
      this.total.percentDiff = (this.compareScore == this.compareScorePartyRatio) ? 0 : this.total.diff / this.total.scoreBatch1st * 100;
    }
  }

  presentPopover(item: string) {
    let popover = this.popoverCtrl.create(SortPopoverComponent, { isCompare: true });
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      switch (data) {
        case 1:
          (item == 'diff') ? this.compareScore.sort((a, b) => a.diff - b.diff)
            : this.compareScore.sort((a, b) => a.percentDiff - b.percentDiff);
          break;
        case 2:
          (item == 'diff') ? this.compareScore.sort((a, b) => b.diff - a.diff)
            : this.compareScore.sort((a, b) => b.percentDiff - a.percentDiff);
          break;
        case 3:
          this.compareScore = (this.type == 'score') ?
            this.compareScoreParty.filter(it => it.diff < 0) :
            this.compareScorePartyRatio.filter(it => it.diff < 0);
          this.calcTotal();
          break;
        case 4:
          this.compareScore = (this.type == 'score') ?
            this.compareScoreParty.filter(it => it.diff > 0) :
            this.compareScorePartyRatio.filter(it => it.diff > 0);
          this.calcTotal();
          break;
        case 5:
          this.setData();
          break;
        default:
          break;
      }
    });
  }
}
