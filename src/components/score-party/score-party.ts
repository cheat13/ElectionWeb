import { Component } from '@angular/core';
import { ShowScore } from '../../app/models';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';
import { PopoverController, LoadingController } from 'ionic-angular';
import { SortPopoverComponent } from '../sort-popover/sort-popover';

/**
 * Generated class for the ScorePartyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-party',
  templateUrl: 'score-party.html'
})
export class ScorePartyComponent {

  public type: string;
  public showScore: ShowScore[] = [];
  public showScoreParty: ShowScore[] = [];
  public showScorePartyRatio: ShowScore[] = [];
  public total: ShowScore = new ShowScore();

  constructor(private cloudSync: CloudSyncProvider, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    console.log('Hello ScorePartyComponent Component');
    this.type = 'score';
  }

  ngOnInit() {
    this.loadShowScoreParty();
    this.loadShowScorePartyRatio();
  }

  loadShowScoreParty() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.cloudSync.loadShowScoreParty()
      .subscribe(data => {
        this.showScoreParty = data;
        this.setData();
        loader.dismiss();
      });
  }

  loadShowScorePartyRatio() {
    this.cloudSync.loadShowScorePartyRatio()
      .subscribe(data => {
        this.showScorePartyRatio = data;
        this.setData();
      });
  }

  setData() {
    this.showScore = (this.type == 'score') ? this.showScoreParty : this.showScorePartyRatio;
    this.calcTotal();
  }

  calcTotal() {
    if (this.showScore.length > 0) {
      this.total.party = 'คะแนนรวม';
      this.total.scoreBatch1 = this.showScore.map(it => it.scoreBatch1).reduce((a, b) => a + b);
      this.total.scoreBatch2 = this.showScore.map(it => it.scoreBatch2).reduce((a, b) => a + b);
      this.total.scoreBatch3 = this.showScore.map(it => it.scoreBatch3).reduce((a, b) => a + b);
      this.total.scoreBatch4 = this.showScore.map(it => it.scoreBatch4).reduce((a, b) => a + b);
      this.total.scoreBatch5 = this.showScore.map(it => it.scoreBatch5).reduce((a, b) => a + b);
      this.total.scoreBatch6 = this.showScore.map(it => it.scoreBatch6).reduce((a, b) => a + b);
    }
  }

  presentPopover(batch: number) {
    let popover = this.popoverCtrl.create(SortPopoverComponent, { isCompare: false });
    popover.present({
      ev: event
    });
    popover.onDidDismiss(data => {
      if (data != null) {
        switch (batch) {
          case 1:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch1 - a.scoreBatch1) :
              this.showScore.sort((a, b) => a.scoreBatch1 - b.scoreBatch1);
            break;
          case 2:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch2 - a.scoreBatch2) :
              this.showScore.sort((a, b) => a.scoreBatch2 - b.scoreBatch2);
            break;
          case 3:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch3 - a.scoreBatch3) :
              this.showScore.sort((a, b) => a.scoreBatch3 - b.scoreBatch3);
            break;
          case 4:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch4 - a.scoreBatch4) :
              this.showScore.sort((a, b) => a.scoreBatch4 - b.scoreBatch4);
            break;
          case 5:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch5 - a.scoreBatch5) :
              this.showScore.sort((a, b) => a.scoreBatch5 - b.scoreBatch5);
            break;
          case 6:
            (data == 2) ? this.showScore.sort((a, b) => b.scoreBatch6 - a.scoreBatch6) :
              this.showScore.sort((a, b) => a.scoreBatch6 - b.scoreBatch6);
            break;
          default:
            break;
        }
      }
    });
  }

}
