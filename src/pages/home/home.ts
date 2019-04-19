import { ScoreAreaV2, DataSet, DataChart } from './../../app/models';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public chart: any;
  public title: any;
  public party: any;
  public typeChart: any;
  public dataChart: any;
  public optionsChart: any;

  constructor(public navCtrl: NavController, private cloudSync: CloudSyncProvider, public loadingCtrl: LoadingController) {
    this.chart = "3";
    this.title = "จำนวนผู้มีสิทธิเลือกตั้ง";
    this.typeChart = "scatter";
    this.party = "ทั้งหมด";
  }

  ionViewDidEnter() {
    this.loadDataChart(1);
  }

  loadDataChart(type: number) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    let data$ = (type == 1) ? this.cloudSync.loadDataChart(this.party, this.chart) : this.cloudSync.loadDataPartyChart(this.party);
    data$.subscribe(data => {
      this.dataChart = data;
      this.setOptionsChart();
      loader.dismiss();
    });
  }

  switchChart() {
    switch (this.chart) {
      case "1":
        this.title = "สัดส่วนผู้มาใช้สิทธิ (%)";
        this.loadDataChart(1);
        break;
      case "2":
        this.title = "สัดส่วนคะแนนพรรค (%)";
        this.loadDataChart(2)
        break;
      case "3":
        this.title = "จำนวนผู้มีสิทธิเลือกตั้ง";
        this.loadDataChart(1);
        break;
      case "4":
        this.title = "จำนวนผู้มาใช้สิทธิเลือกตั้ง";
        this.loadDataChart(1);
        break;
      default:
        break;
    }
  }

  setOptionsChart() {
    this.optionsChart = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: 'black',
          fontSize: 16,
        }
      },
      tooltips: {
        bodyFontSize: 16,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.labels[tooltipItem.xLabel - 1] || '';
            let percent = Math.round(tooltipItem.yLabel * 100) / 100;
            let sum = data.datasets[tooltipItem.datasetIndex].data.map(it => it.y).reduce((a, b) => a + b);
            let amount = data.datasets[tooltipItem.datasetIndex].data.length;
            let avg = Math.round(sum / amount * 100) / 100;
            label += ': ' + percent + ' (' + avg + ')';
            return label;
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: this.title,
            fontSize: 14,
            fontStyle: 'bold'
          },
          ticks: {
            max: (this.chart == "1" || this.chart == '2') ? 100 : 250000,
            beginAtZero: true,
            callback: function (value) {
              return (value > 100) ? value : value + '%';
            }
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'เขตเลือกตั้ง (350 เขต)',
            fontSize: 14,
            fontStyle: 'bold'
          },
        }]
      },
    };
  }
}