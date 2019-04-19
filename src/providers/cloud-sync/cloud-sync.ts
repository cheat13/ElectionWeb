import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScoreAreaV2, DataChart } from '../../app/models';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the CloudSyncProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CloudSyncProvider {

  private readonly baseUrl: string = "https://electionwebapi.azurewebsites.net/api/ElectionCalc/";

  constructor(public http: HttpClient) {
    console.log('Hello CloudSyncProvider Provider');
  }

  public loadScoreArea(): Observable<any> {
    return this.http.get<ScoreAreaV2[]>(this.baseUrl + 'GetScoreAreaV2/');
  }

  public loadDataChart(party: string, chart: string): Observable<any> {
    return this.http.get<DataChart>(this.baseUrl + 'GetDataChart/' + party + "/" + chart);
  }

  public loadDataPartyChart(party: string): Observable<any> {
    return this.http.get<DataChart>(this.baseUrl + 'GetDataPartyChart/' + party);
  }



}
