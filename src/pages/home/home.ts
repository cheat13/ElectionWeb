import { ScoreAreaV2, DataSet, DataChart } from './../../app/models';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public chart: any;
  public party: any;
  public typeChart = 'scatter';
  public dataChart: any;
  public optionsChart: any;
  public data: DataChart = new DataChart();

  constructor(public navCtrl: NavController, private cloudSync: CloudSyncProvider) {
    this.chart = "1";
    this.party = "ทั้งหมด";
  }

  ionViewDidEnter() {
    this.loadDataChart();
    this.setOptionsChart()
  }

  loadDataChart() {
    this.cloudSync.loadDataChart(this.party).subscribe(data => {
      this.dataChart = data;
      console.log(this.dataChart);
    });
  }

  loadDataPartyChart() {
    this.cloudSync.loadDataPartyChart(this.party).subscribe(data => {
      this.dataChart = data;
      console.log(this.dataChart);
    });
  }

  switchChart() {
    if (this.chart == "1") {
      this.party = "ทั้งหมด";
      this.loadDataChart();
    } else {
      this.party = "พลังประชารัฐ";
      this.loadDataPartyChart()
    }
  }

  setOptionsChart() {
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.xLabel - 1] || '';
            let percent = Math.round(tooltipItem.yLabel * 100) / 100;
            let sum = data.datasets[tooltipItem.datasetIndex].data.map(it => it.y).reduce((a, b) => a + b);
            let amount = data.datasets[tooltipItem.datasetIndex].data.length;
            let avg = Math.round(sum / amount * 100) / 100;
            label += ': ' + percent + '% (' + avg + '%)';
            return label;
          }
        }
      }
    };
  }
}