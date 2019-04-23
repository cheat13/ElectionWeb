import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';

@Component({
  selector: 'election-chart',
  templateUrl: 'election-chart.html'
})
export class ElectionChartComponent {

  public chart: any;
  public type: any;
  public title: any;
  public party: any;
  public typeChart: any;
  public dataChart: any;
  public optionsChart: any;

  constructor(public navCtrl: NavController, private cloudSync: CloudSyncProvider, public loadingCtrl: LoadingController) {
    console.log('Hello ElectionChartComponent Component');
    this.chart = "3";
    this.type = "0";
    this.title = "จำนวนผู้มีสิทธิเลือกตั้ง";
    this.typeChart = "scatter";
    this.party = "ทั้งหมด";
  }

  ngOnInit() {
    this.loadDataChart(1);
  }

  loadDataChart(type: number) {
    let chart = (this.chart > 4) ? Number(this.chart) + Number(this.type) : this.chart;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    let data$ = (type == 1) ? this.cloudSync.loadDataChart(this.party, chart.toString()) : this.cloudSync.loadDataPartyChart(this.party);
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
        break;
      case "2":
        this.title = "สัดส่วนคะแนนพรรค (%)";
        this.party = "พลังประชารัฐ";
        break;
      case "3":
        this.title = "จำนวนผู้มีสิทธิเลือกตั้ง";
        break;
      case "4":
        this.title = "จำนวนผู้มาใช้สิทธิเลือกตั้ง";
        break;
      case "5":
        this.title = "ผลต่างคะแนน 24:25";
        break;
      case "6":
        this.title = "ผลต่างคะแนน 25:28";
        break;
      case "7":
        this.title = "ผลต่างคะแนน 24:28";
        break;
      default:
        break;
    }
    (this.chart == "2") ? this.loadDataChart(2) : this.loadDataChart(1);
  }

  setOptionsChart() {
    this.optionsChart = {
      animation: {
        duration: 1000,
      },
      elements: {
        point: {
          hitRadius: 10,
          hoverRadius: 6
        }
      },
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
            suggestedMax: (this.chart == "4") ? 250000 : 100,
            suggestedMin: 0,
            callback: function (value) {
              return (Math.abs(value) < 1000) ? value : (value / 1000) + 'k';
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
