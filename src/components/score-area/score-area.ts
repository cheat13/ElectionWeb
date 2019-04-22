import { Component } from '@angular/core';
import { ShowScoreArea } from '../../app/models';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';
import { PopoverController, LoadingController } from 'ionic-angular';
import { SortPopoverComponent } from '../sort-popover/sort-popover';

/**
 * Generated class for the ScoreAreaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-area',
  templateUrl: 'score-area.html'
})
export class ScoreAreaComponent {

  public showScoreArea: ShowScoreArea[] = [];
  public scoreArea: ShowScoreArea[] = [];
  public totalScore: ShowScoreArea = new ShowScoreArea;
  constructor(private cloudSync: CloudSyncProvider, public popoverCtrl: PopoverController, public loadingCtrl: LoadingController) {
    console.log('Hello ScoreAreaComponent Component');
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.cloudSync.loadShowScoreArea().subscribe(data => {
      this.showScoreArea = data;
      this.setData();
      loader.dismiss();
    });
  }

  setData() {
    if (this.showScoreArea.length > 0) {
      this.totalScore.province = "คะแนนรวม";
      this.totalScore.scoreBatch1 = this.showScoreArea.map(it => it.scoreBatch1).reduce(((a, b) => a + b));
      this.totalScore.scoreBatch2 = this.showScoreArea.map(it => it.scoreBatch2).reduce(((a, b) => a + b));
      this.totalScore.scoreBatch3 = this.showScoreArea.map(it => it.scoreBatch3).reduce(((a, b) => a + b));
      this.totalScore.scoreBatch4 = this.showScoreArea.map(it => it.scoreBatch4).reduce(((a, b) => a + b));
      this.totalScore.scoreBatch5 = this.showScoreArea.map(it => it.scoreBatch5).reduce(((a, b) => a + b));
      this.totalScore.scoreBatch6 = this.showScoreArea.map(it => it.scoreBatch6).reduce(((a, b) => a + b));
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
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch1 - a.scoreBatch1) :
              this.showScoreArea.sort((a, b) => a.scoreBatch1 - b.scoreBatch1);
            break;
          case 2:
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch2 - a.scoreBatch2) :
              this.showScoreArea.sort((a, b) => a.scoreBatch2 - b.scoreBatch2);
            break;
          case 3:
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch3 - a.scoreBatch3) :
              this.showScoreArea.sort((a, b) => a.scoreBatch3 - b.scoreBatch3);
            break;
          case 4:
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch4 - a.scoreBatch4) :
              this.showScoreArea.sort((a, b) => a.scoreBatch4 - b.scoreBatch4);
            break;
          case 5:
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch5 - a.scoreBatch5) :
              this.showScoreArea.sort((a, b) => a.scoreBatch5 - b.scoreBatch5);
            break;
          case 6:
            (data == 2) ? this.showScoreArea.sort((a, b) => b.scoreBatch6 - a.scoreBatch6) :
              this.showScoreArea.sort((a, b) => a.scoreBatch6 - b.scoreBatch6);
            break;
          default:
            break;
        }
      }
    });
  }

}
