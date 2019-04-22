import { NgModule } from '@angular/core';
import { ElectionChartComponent } from './election-chart/election-chart';
import { ElectionTableComponent } from './election-table/election-table';
import { IonicPageModule } from 'ionic-angular';
import { ChartModule } from 'angular2-chartjs';
import { TableAreaComponent } from './table-area/table-area';
import { TablePartyComponent } from './table-party/table-party';
import { ScoreAreaComponent } from './score-area/score-area';
import { ScorePartyComponent } from './score-party/score-party';
import { CompareAreaComponent } from './compare-area/compare-area';
import { ComparePartyComponent } from './compare-party/compare-party';
import { SortPopoverComponent } from './sort-popover/sort-popover';
@NgModule({
	declarations: [ElectionChartComponent,
		ElectionTableComponent,
    TableAreaComponent,
    TablePartyComponent,
    ScoreAreaComponent,
    ScorePartyComponent,
    CompareAreaComponent,
    ComparePartyComponent,
    SortPopoverComponent,],
	imports: [
		IonicPageModule.forChild(SortPopoverComponent),
		ChartModule],
	entryComponents: [
		ElectionChartComponent],
	exports: [ElectionChartComponent,
		ElectionTableComponent,
    TableAreaComponent,
    TablePartyComponent,
    ScoreAreaComponent,
    ScorePartyComponent,
    CompareAreaComponent,
    ComparePartyComponent,
    SortPopoverComponent,]
})
export class ComponentsModule { }
